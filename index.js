import express from "express";
import TelegramBot from "node-telegram-bot-api";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const token = process.env.TL_TOKEN;

// Initialize Telegram Bot with polling
const bot = new TelegramBot(token, { polling: true });

// Bot command: /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "It's Adviks Bot, Send a Message");
});

// Echo any text message
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text.startsWith("/")) {
    try {
      const question = msg.text;
      const modelConfig = {
        apiKey: process.env.API_KEY,
        model: "gemma-3-4b-it",
      };

      const model = new ChatGoogleGenerativeAI(modelConfig);

      const prompt = new PromptTemplate({
        inputVariables: ["question"],
        inputVariables: ["question"],
        template: `You are a deep search robot who loves sharing up to date details!.Now answer this question: {question} Make it return updated results.`,
      });

      const formattedPrompt = await prompt.format({
        question,
      });

      const response = await model.invoke(formattedPrompt);
      const parsedResponse = await new StringOutputParser().parse(
        response.content
      );

      bot.sendMessage(chatId, parsedResponse);
    } catch (error) {
      console.error("Robot got confused:", error.message);
    }
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
