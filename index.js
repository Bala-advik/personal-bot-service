const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

require("dotenv").config();

const TOKEN = process.env.TL_TOKEN;
// Telegram chat ID (optional, set dynamically or hardcode)
let chatId = null;

// Initialize the bot
const bot = new TelegramBot(TOKEN, { polling: true });

// Handle /start command
bot.onText(/\/start/, (msg) => {
  chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome! I will send you daily gold prices at 9:00 AM."
  );
});

// Handle errors
bot.on("polling_error", (error) => {
  console.error("Polling error:", error.message);
});

console.log("Bot is running...");
