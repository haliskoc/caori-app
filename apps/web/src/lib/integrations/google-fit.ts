import { google } from "googleapis";
import type { fitness_v1 } from "googleapis";
import type { Credentials } from "google-auth-library";
import { getDb } from "@/lib/database/db";
import { googleFitTokens } from "@/lib/database/schema";
import { eq } from "drizzle-orm";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.APP_BASE_URL}/api/integrations/google/callback`
);

export const getAuthUrl = (state?: string) => {
  const scopes = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.nutrition.read",
    // Add other scopes if needed, e.g. weight, heart rate
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent", // Force refresh token generation
    state,
  });
};

export const getTokens = async (code: string): Promise<Credentials> => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

export const saveTokens = async (userId: string, tokens: Credentials) => {
  if (!tokens.access_token || !tokens.refresh_token) {
    return;
  }
  const db = getDb();
  await db
    .insert(googleFitTokens)
    .values({
      userId,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiryDate: tokens.expiry_date ?? null,
    })
    .onConflictDoUpdate({
      target: googleFitTokens.userId,
      set: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date ?? null,
        updatedAt: new Date(),
      },
    });
};

export const getFitData = async (userId: string, startTime: Date, endTime: Date) => {
  const db = getDb();
  const tokenData = await db
    .select()
    .from(googleFitTokens)
    .where(eq(googleFitTokens.userId, userId))
    .limit(1);

  if (!tokenData.length) return null;

  oauth2Client.setCredentials({
    access_token: tokenData[0].accessToken,
    refresh_token: tokenData[0].refreshToken,
    expiry_date: tokenData[0].expiryDate,
  });

  // Handle token refresh automatically by googleapis if expiry_date is set?
  // Usually googleapis handles it if refresh_token is present.
  
  // We might want to listen to token refresh events to update DB, 
  // but for now relying on googleapis auto-refresh in memory for this session request.
  // Ideally, one should capture the 'tokens' event.
  
  oauth2Client.on("tokens", async (tokens: Credentials) => {
    const mergedTokens: Credentials = {
      access_token: tokens.access_token ?? tokenData[0].accessToken,
      refresh_token: tokens.refresh_token ?? tokenData[0].refreshToken,
      expiry_date: tokens.expiry_date ?? tokenData[0].expiryDate ?? undefined,
    };
    if (mergedTokens.access_token && mergedTokens.refresh_token) {
      await saveTokens(userId, mergedTokens);
      return;
    }
    if (!tokens.access_token) {
      return;
    }
    await db
      .update(googleFitTokens)
      .set({
        accessToken: tokens.access_token,
        expiryDate: tokens.expiry_date ?? null,
      })
      .where(eq(googleFitTokens.userId, userId));
  });


  const fitness = google.fitness({ version: "v1", auth: oauth2Client });

  // Example: Fetch Activity (Calories & Steps)
  // We need to query the dataset. Aggregate is best.
  
  try {
    const request: fitness_v1.Params$Resource$Users$Dataset$Aggregate = {
      userId: "me",
      requestBody: {
        aggregateBy: [
          {
            dataTypeName: "com.google.calories.expended",
          },
          {
            dataTypeName: "com.google.step_count.delta",
          },
          {
            dataTypeName: "com.google.active_minutes",
          },
        ],
        bucketByTime: { durationMillis: "86400000" }, // Daily buckets
        startTimeMillis: String(startTime.getTime()),
        endTimeMillis: String(endTime.getTime()),
      },
    };

    const response = await fitness.users.dataset.aggregate(request);

    return response.data;
  } catch (error) {
    console.error("Error fetching Google Fit data:", error);
    throw error;
  }
};

export const syncDailyData = async (userId: string) => {
    // Sync for today
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const data = await getFitData(userId, startOfDay, endOfDay);
    
    if (!data || !data.bucket) return;

    // Process data and upsert into entries
    // This logic depends on how you want to store it. 
    // You might want a separate table or just add as an entry of type "google_fit_sync".

    // For now, let's just log it or return it, 
    // real implementation requires mapping "bucket" data to "entries" rows.
    
    return data;
}
