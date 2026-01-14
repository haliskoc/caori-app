/**
 * Brave Search API Integration
 * API Key: https://brave.com/search/api/
 * Free tier: 2,000 queries/month
 */

const BRAVE_API_KEY = process.env.BRAVE_SEARCH_API_KEY;
const BRAVE_BASE_URL = "https://api.search.brave.com/res/v1/web/search";

export type BraveSearchResult = {
    title: string;
    url: string;
    description: string;
};

export type BraveSearchResponse = {
    results: BraveSearchResult[];
    query: string;
};

/**
 * Search the web using Brave Search API
 */
export async function braveSearch(query: string, count: number = 5): Promise<BraveSearchResponse | null> {
    if (!BRAVE_API_KEY) {
        console.warn("BRAVE_SEARCH_API_KEY is not configured");
        return null;
    }

    try {
        const url = new URL(BRAVE_BASE_URL);
        url.searchParams.set("q", query);
        url.searchParams.set("count", String(count));
        url.searchParams.set("safesearch", "moderate");
        url.searchParams.set("text_decorations", "false");

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Accept-Encoding": "gzip",
                "X-Subscription-Token": BRAVE_API_KEY,
            },
        });

        if (!response.ok) {
            console.error("Brave Search API error:", response.status, await response.text());
            return null;
        }

        const data = await response.json();

        // Extract web results
        const webResults = data.web?.results || [];
        const results: BraveSearchResult[] = webResults.slice(0, count).map((result: any) => ({
            title: result.title || "",
            url: result.url || "",
            description: result.description || "",
        }));

        return {
            results,
            query,
        };
    } catch (error) {
        console.error("Brave Search API request failed:", error);
        return null;
    }
}

/**
 * Format search results for AI context
 */
export function formatSearchResultsForAI(searchResponse: BraveSearchResponse | null): string {
    if (!searchResponse || searchResponse.results.length === 0) {
        return "Web araması sonuç döndürmedi.";
    }

    const formattedResults = searchResponse.results.map((result, index) => {
        return `[${index + 1}] **${result.title}**\n${result.description}\nKaynak: ${result.url}`;
    }).join("\n\n");

    return `### Web Arama Sonuçları: "${searchResponse.query}"\n\n${formattedResults}`;
}

/**
 * Check if Brave Search is configured (Deactivated for now as per user request)
 */
export function isBraveSearchConfigured(): boolean {
    return false; // Manually deactivated
}
