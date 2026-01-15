const mongoose = require("mongoose");
const Message = require("../server/src/models/Message");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "POST") {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const saved = await Message.create({ name, email, message });
      return res.status(201).json(saved);
    }

    if (req.method === "GET") {
      const msgs = await Message.find().sort({ createdAt: -1 });
      return res.status(200).json(msgs);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: err.message });
  }
};
