const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const token = process.env.TL_TOKEN;

// Initialize Telegram Bot with polling
const bot = new TelegramBot(token, { polling: true });

// Bot command: /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome to MyExpressBot! Send any message, and I’ll echo it back."
  );
});

// Echo any text message
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text.startsWith("/")) {
    // Ignore commands
    bot.sendMessage(chatId, `You said: ${text}`);
  }
});

// Optional: Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("Bot is running!");
});

// Start Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
