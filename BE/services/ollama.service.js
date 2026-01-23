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

  async scoreCV(cvData, userData) {
    try {
      const cvContent = this.buildCVContent(cvData, userData);
      
      const prompt = `Bạn là chuyên gia đánh giá CV. Hãy phân tích và chấm điểm CV sau đây theo định dạng JSON chính xác:

${cvContent}

Trả về kết quả PHẢI là JSON hợp lệ với cấu trúc sau (không có text thêm, chỉ JSON):
{
  "overallScore": <số từ 0-100>,
  "scores": {
    "completeness": <số từ 0-100>,
    "skillsQuality": <số từ 0-100>,
    "experienceQuality": <số từ 0-100>,
    "educationQuality": <số từ 0-100>,
    "presentation": <số từ 0-100>
  },
  "analysis": "<phân tích tổng quan 2-3 câu>",
  "suggestions": ["<gợi ý 1>", "<gợi ý 2>", "<gợi ý 3>"],
  "strengths": ["<điểm mạnh 1>", "<điểm mạnh 2>"],
  "weaknesses": ["<điểm yếu 1>", "<điểm yếu 2>"]
}

Tiêu chí chấm điểm:
- completeness: Độ đầy đủ thông tin (có đủ các mục: kinh nghiệm, học vấn, kỹ năng)
- skillsQuality: Chất lượng kỹ năng (đa dạng, phù hợp ngành)
- experienceQuality: Chất lượng kinh nghiệm (mô tả rõ ràng, thành tựu cụ thể)
- educationQuality: Chất lượng học vấn (trình độ, liên quan công việc)
- presentation: Cách trình bày (cấu trúc, ngắn gọn, dễ đọc)

Chỉ trả về JSON, không có markdown, không có text khác.`;

      const response = await this.chat(prompt, []);
      
      console.log("Raw AI Response:", response);
      
      // Parse JSON response with better error handling
      let cleanedResponse = response.trim();
      
      // Remove markdown code blocks if present
      if (cleanedResponse.includes('```')) {
        cleanedResponse = cleanedResponse.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
      }
      
      // Find JSON object in response (in case there's extra text)
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedResponse = jsonMatch[0];
      }
      
      // Replace single quotes with double quotes if needed
      cleanedResponse = cleanedResponse.replace(/'/g, '"');
      
      console.log("Cleaned Response:", cleanedResponse);
      
      let scoreData;
      try {
        scoreData = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError.message);
        console.error("Failed to parse:", cleanedResponse.substring(0, 200));
        
        // Return default scores if parsing fails
        return {
          overallScore: 50,
          scores: {
            completeness: 50,
            skillsQuality: 50,
            experienceQuality: 50,
            educationQuality: 50,
            presentation: 50,
          },
          analysis: "Không thể phân tích CV tự động. Vui lòng thử lại.",
          suggestions: ["Vui lòng thử chấm điểm lại"],
          strengths: ["Đang cập nhật..."],
          weaknesses: ["Đang cập nhật..."],
          lastScored: new Date(),
        };
      }
      
      // Validate and ensure all required fields exist
      return {
        overallScore: Number(scoreData.overallScore) || 0,
        scores: {
          completeness: Number(scoreData.scores?.completeness) || 0,
          skillsQuality: Number(scoreData.scores?.skillsQuality) || 0,
          experienceQuality: Number(scoreData.scores?.experienceQuality) || 0,
          educationQuality: Number(scoreData.scores?.educationQuality) || 0,
          presentation: Number(scoreData.scores?.presentation) || 0,
        },
        analysis: scoreData.analysis || "",
        suggestions: Array.isArray(scoreData.suggestions) ? scoreData.suggestions : [],
        strengths: Array.isArray(scoreData.strengths) ? scoreData.strengths : [],
        weaknesses: Array.isArray(scoreData.weaknesses) ? scoreData.weaknesses : [],
        lastScored: new Date(),
      };
    } catch (error) {
      console.error("CV Scoring Error:", error.message);
      console.error("Full error:", error);
      throw new Error(`Không thể chấm điểm CV: ${error.message}`);
    }
  }

  buildCVContent(cvData, userData) {
    const parts = [`=== THÔNG TIN CÁ NHÂN ===`];
    parts.push(`Họ tên: ${userData?.fullName || "Không có"}`);
    parts.push(`Email: ${userData?.email || "Không có"}`);
    parts.push(`Số điện thoại: ${userData?.phoneNumber || "Không có"}`);
    parts.push(`Vị trí mong muốn: ${userData?.jobTitle || "Không có"}`);
    parts.push(`Địa chỉ: ${userData?.address || "Không có"}`);
    
    if (userData?.introduction && userData.introduction.length > 0) {
      parts.push(`\n=== GIỚI THIỆU ===`);
      parts.push(userData.introduction.join("\n"));
    }

    if (cvData?.skills && cvData.skills.length > 0) {
      parts.push(`\n=== KỸ NĂNG ===`);
      cvData.skills.forEach((skill) => {
        if (typeof skill === 'object') {
          parts.push(`- ${skill.name || skill.skill}: ${skill.level || skill.proficiency || "Không xác định"}`);
        } else {
          parts.push(`- ${skill}`);
        }
      });
    }

    if (cvData?.experience && cvData.experience.length > 0) {
      parts.push(`\n=== KINH NGHIỆM LÀM VIỆC ===`);
      cvData.experience.forEach((exp, idx) => {
        parts.push(`${idx + 1}. ${exp.position || exp.title} tại ${exp.company}`);
        parts.push(`   Thời gian: ${exp.startDate || exp.from} - ${exp.endDate || exp.to || "Hiện tại"}`);
        if (exp.description || exp.responsibilities) {
          parts.push(`   Mô tả: ${exp.description || exp.responsibilities}`);
        }
      });
    }

    if (cvData?.education && cvData.education.length > 0) {
      parts.push(`\n=== HỌC VẤN ===`);
      cvData.education.forEach((edu, idx) => {
        parts.push(`${idx + 1}. ${edu.degree || edu.level} - ${edu.institution || edu.school}`);
        parts.push(`   Thời gian: ${edu.startDate || edu.from} - ${edu.endDate || edu.to || "Hiện tại"}`);
        if (edu.major || edu.field) {
          parts.push(`   Chuyên ngành: ${edu.major || edu.field}`);
        }
      });
    }

    if (cvData?.projects && cvData.projects.length > 0) {
      parts.push(`\n=== DỰ ÁN ===`);
      cvData.projects.forEach((proj, idx) => {
        parts.push(`${idx + 1}. ${proj.name || proj.title}`);
        if (proj.description) {
          parts.push(`   Mô tả: ${proj.description}`);
        }
      });
    }

    if (cvData?.certificates && cvData.certificates.length > 0) {
      parts.push(`\n=== CHỨNG CHỈ ===`);
      cvData.certificates.forEach((cert) => {
        parts.push(`- ${cert.name || cert.title} (${cert.year || cert.date || ""})`);
      });
    }

    if (userData?.foreignLanguages && userData.foreignLanguages.length > 0) {
      parts.push(`\n=== NGOẠI NGỮ ===`);
      userData.foreignLanguages.forEach((lang) => {
        parts.push(`- ${lang.language || lang.name}: ${lang.level || lang.proficiency}`);
      });
    }

    return parts.join("\n");
  }
}

export default new OllamaService();
