import axios from "axios";

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:8080";
const MODEL = process.env.OLLAMA_MODEL || "phi3:mini";

class OllamaService {
  constructor() {
    this.baseURL = OLLAMA_HOST;
    this.model = MODEL;
  }

  
  async chat(message, history = []) {
    try {
    
      const recentHistory = history.slice(-5);

      
      const context = recentHistory
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      const prompt = context
        ? `${context}\nuser: ${message}\nassistant:`
        : message;

      const response = await axios.post(
        `${this.baseURL}/api/generate`,
        {
          model: this.model,
          prompt: prompt,
          stream: false,
          options: {
            num_predict: 500,
            temperature: 0.7,
          },
        },
        {
          timeout: 120000, 
        }
      );

      return response.data.response;
    } catch (error) {
      console.error("Ollama Service Error:", error.message);
      throw new Error(`Không thể kết nối với Ollama: ${error.message}`);
    }
  }

  
  async chatStream(message, history = [], onChunk) {
    try {
      const context = history
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      const prompt = context
        ? `${context}\nuser: ${message}\nassistant:`
        : message;

      const response = await axios.post(
        `${this.baseURL}/api/generate`,
        {
          model: this.model,
          prompt: prompt,
          stream: true,
        },
        {
          responseType: "stream",
          timeout: 60000,
        }
      );

      return new Promise((resolve, reject) => {
        let fullResponse = "";

        response.data.on("data", (chunk) => {
          const lines = chunk.toString().split("\n").filter(Boolean);

          lines.forEach((line) => {
            try {
              const data = JSON.parse(line);
              if (data.response) {
                fullResponse += data.response;
                if (onChunk) {
                  onChunk(data.response);
                }
              }
              if (data.done) {
                resolve(fullResponse);
              }
            } catch (e) {
           
            }
          });
        });

        response.data.on("error", (error) => {
          reject(error);
        });

        response.data.on("end", () => {
          if (fullResponse) {
            resolve(fullResponse);
          }
        });
      });
    } catch (error) {
      console.error("Ollama Streaming Error:", error.message);
      throw new Error(`Không thể kết nối với Ollama: ${error.message}`);
    }
  }

  
  async checkHealth() {
    try {
      const response = await axios.get(`${this.baseURL}/api/tags`, {
        timeout: 5000,
      });
      return {
        status: "ok",
        models: response.data.models || [],
      };
    } catch (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
  }

  async getModels() {
    try {
      const response = await axios.get(`${this.baseURL}/api/tags`);
      return response.data.models || [];
    } catch (error) {
      console.error("Get Models Error:", error.message);
      throw new Error("Không thể lấy danh sách models");
    }
  }
}

export default new OllamaService();
