import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: path.join(__dirname, "../../.env") });

export const connectDB = async () => {
    try {
        // Debug: Print environment variable status
        console.log("🔍 Checking environment variables...");
        console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
        console.log("MONGO_URI value:", process.env.MONGO_URI ? "Found" : "Not found");
        
        if (!process.env.MONGO_URI) {
            console.error("❌ MONGO_URI is not defined!");
            console.log("Current working directory:", process.cwd());
            console.log("Looking for .env at:", path.join(__dirname, "../../.env"));
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        console.log("🔗 Attempting to connect to MongoDB...");
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};