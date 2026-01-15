
import { neon } from "@neondatabase/serverless";

const databaseUrl = "postgresql://neondb_owner:npg_kwc9NvQY8yOE@ep-proud-dust-ah9opx7f-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function main() {
    const client = neon(databaseUrl);
    console.log("Checking table columns for 'users'...");
    try {
        const result = await client`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users';
        `;
        console.table(result);
    } catch (err) {
        console.error("Error checking columns:", err);
    }
}

main();
