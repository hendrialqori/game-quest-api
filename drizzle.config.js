import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config()

export default defineConfig({
    schema: [
        "./src/model/schema.js"
    ],
    out: "./src/drizzle/migrations",
    dialect: "mysql",
    dbCredentials: {
        url: process.env.DATABASE_URL
    }
})