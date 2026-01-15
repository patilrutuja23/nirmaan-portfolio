import mongoose from "mongoose";
import Message from "./Message.js";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  // Set CORS headers for serverless
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI not set in environment");
      return res.status(500).json({ error: "Database not configured" });
    }

    await connectDB();

    if (req.method === "POST") {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields: name, email, message" });
      }

      const saved = await Message.create({ name, email, message });
      console.log("Message saved:", saved._id);
      return res.status(201).json(saved);
    }

    if (req.method === "GET") {
      const msgs = await Message.find().sort({ createdAt: -1 });
      return res.status(200).json(msgs);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: err instanceof Error ? err.message : "Internal server error" });
  }
}
