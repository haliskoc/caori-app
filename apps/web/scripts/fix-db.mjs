
import { neon } from "@neondatabase/serverless";

const databaseUrl = "postgresql://neondb_owner:npg_kwc9NvQY8yOE@ep-proud-dust-ah9opx7f-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function main() {
    const sql = neon(databaseUrl);
    console.log("Starting manual schema fix with tagged templates...");
    try {
        await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS plan text DEFAULT 'free' NOT NULL`;
        console.log("Added 'plan'");
        await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'active'`;
        console.log("Added 'subscription_status'");
        await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS usage_count integer DEFAULT 0`;
        console.log("Added 'usage_count'");
        await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS last_reset timestamp with time zone`;
        console.log("Added 'last_reset'");
        console.log("All columns added successfully!");
    } catch (err) {
        console.error("Error during manual fix:", err);
    }
}

main();
