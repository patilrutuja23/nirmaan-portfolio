const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const msg = new Message({ name, email, message });
    const saved = await msg.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: -1 });
    return res.json(msgs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
