import ollamaService from "../../services/ollama.service.js";

export const checkHealth = async (req, res) => {
  try {
    const health = await ollamaService.checkHealth();
    res.json({
      code: 200,
      message: "Health check successful",
      data: health,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error checking Ollama connection",
      error: error.message,
    });
  }
};

export const getModels = async (req, res) => {
  try {
    const models = await ollamaService.getModels();
    res.json({
      code: 200,
      message: "Successfully retrieved models list",
      data: models,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error retrieving models list",
      error: error.message,
    });
  }
};

export const chat = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        code: 400,
        message: "Message cannot be empty",
      });
    }

    const systemContext = [
      {
        role: "system",
        content: `You are an AI assistant for a recruitment system. Help with job searching, CV consulting, and recruitment inquiries in a concise and friendly manner.`,
      },
    ];

    const fullHistory =
      history && history.length > 0 ? history : [...systemContext];

    const response = await ollamaService.chat(message, fullHistory);

    res.json({
      code: 200,
      message: "Chat successful",
      data: {
        response: response,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({
      code: 500,
      message: "Error processing chat",
      error: error.message,
    });
  }
};

export const chatStream = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        code: 400,
        message: "Message cannot be empty",
      });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const systemContext = [
      {
        role: "system",
        content: `You are an intelligent AI assistant for a CV management and job recruitment system. 
Help candidates find jobs, provide CV consulting, and assist recruiters in finding suitable candidates.`,
      },
    ];

    const fullHistory = [...systemContext, ...(history || [])];

    await ollamaService.chatStream(message, fullHistory, (chunk) => {
      res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
    });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Chat Stream Error:", error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
};

export const suggestJobs = async (req, res) => {
  try {
    const { skills, experience, location } = req.body;

    const prompt = `Based on the following information, suggest suitable job positions:
- Skills: ${skills || "Not specified"}
- Experience: ${experience || "Not specified"}
- Desired location: ${location || "Flexible"}

Provide 3-5 specific job suggestions and explain why they are suitable.`;

    const response = await ollamaService.chat(prompt);

    res.json({
      code: 200,
      message: "Job suggestions successful",
      data: {
        suggestions: response,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error suggesting jobs",
      error: error.message,
    });
  }
};

export const reviewCV = async (req, res) => {
  try {
    const { cvContent } = req.body;

    if (!cvContent) {
      return res.status(400).json({
        code: 400,
        message: "CV content cannot be empty",
      });
    }

    const prompt = `Please review the following CV and provide improvement feedback:

${cvContent}

Evaluate based on these criteria:
1. Structure and format
2. Content and relevance
3. Skills and experience
4. Strengths and areas for improvement
5. Specific recommendations`;

    const response = await ollamaService.chat(prompt);

    res.json({
      code: 200,
      message: "CV review successful",
      data: {
        review: response,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error reviewing CV",
      error: error.message,
    });
  }
};
