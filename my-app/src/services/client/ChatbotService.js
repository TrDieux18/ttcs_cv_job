import axios from "axios";
import { BASE_API } from "@types/api";

const axiosClient = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

class ChatbotService {
 
  async checkHealth() {
    try {
      const response = await axiosClient.get("/chatbot/health");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  
  async getModels() {
    try {
      const response = await axiosClient.get("/chatbot/models");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }


  async chat(message, history = []) {
    try {
      const response = await axiosClient.post("/chatbot/chat", {
        message,
        history,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  
  async chatStream(message, history = [], onChunk) {
    try {
      const response = await fetch(`${BASE_API}/chatbot/chat-stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ message, history }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.chunk) {
                fullResponse += data.chunk;
                onChunk(data.chunk);
              }
              if (data.done) {
                return fullResponse;
              }
              if (data.error) {
                throw new Error(data.error);
              }
            } catch (e) {
              console.error("Parse error:", e);
            }
          }
        }
      }

      return fullResponse;
    } catch (error) {
      throw error;
    }
  }

  
  async suggestJobs(criteria) {
    try {
      const response = await axiosClient.post(
        "/chatbot/suggest-jobs",
        criteria
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

 
  async reviewCV(cvContent) {
    try {
      const response = await axiosClient.post("/chatbot/review-cv", {
        cvContent,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

export default new ChatbotService();
