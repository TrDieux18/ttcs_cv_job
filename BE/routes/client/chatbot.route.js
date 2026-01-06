import express from "express";
import * as chatbotController from "../../controllers/client/chatbot.controller.js";

const router = express.Router();


router.get("/health", chatbotController.checkHealth);


router.get("/models", chatbotController.getModels);


router.post("/chat", chatbotController.chat);


router.post("/chat-stream", chatbotController.chatStream);


router.post("/suggest-jobs", chatbotController.suggestJobs);


router.post("/review-cv", chatbotController.reviewCV);

export default router;
