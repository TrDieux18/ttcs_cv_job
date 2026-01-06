import { useState, useRef, useEffect } from "react";
import {
  Modal,
  Input,
  Button,
  Avatar,
  Spin,
  message,
  Tag,
  Space,
  Typography,
} from "antd";
import {
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  ClearOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import chatbotService from "@services/client/ChatbotService";
import "./Chatbot.css";

const { TextArea } = Input;
const { Text } = Typography;

const Chatbot = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (visible) {
      checkConnection();
      if (messages.length === 0) {
        setMessages([
          {
            role: "assistant",
            content:
              "👋 Hello! I'm the AI assistant for the recruitment system.\n\n" +
              "I can help you with:\n" +
              "• Find and suggest suitable jobs\n" +
              "• Advise on professional CV writing\n" +
              "• Review and improve your CV\n" +
              "• Answer questions about the recruitment process\n\n" +
              "How can I assist you today? 😊",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    }
  }, [visible]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const checkConnection = async () => {
    try {
      const response = await chatbotService.checkHealth();
      setIsConnected(response.data?.status === "ok");
      if (response.data?.status !== "ok") {
        message.warning("Cannot connect to AI. Please check Ollama.");
      }
    } catch (error) {
      setIsConnected(false);
      message.error("Error connecting to AI chatbot");
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      message.warning("Please enter a message");
      return;
    }

    const userMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await chatbotService.chat(inputMessage, []);

      const assistantMessage = {
        role: "assistant",
        content: response.data.response,
        timestamp: response.data.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      message.error(error.message || "Error sending message");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an issue processing your message. Please try again.",
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat history has been cleared. How can I help you?",
        timestamp: new Date().toISOString(),
      },
    ]);
    message.success("Chat history cleared");
  };

  const handleQuickAction = async (action) => {
    let prompt = "";
    switch (action) {
      case "suggest":
        prompt =
          "I want to find a job that matches my skills. Can you help me?";
        break;
      case "cv-tips":
        prompt = "Give me tips for writing a professional and outstanding CV";
        break;
      case "interview":
        prompt = "How can I prepare well for a job interview?";
        break;
      default:
        return;
    }
    setInputMessage(prompt);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      title={
        <Space className="chatbot-header">
          <RobotOutlined className="chatbot-icon" />
          <Text strong>AI Assistant - Llama 3.1</Text>
          {isConnected === true && (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Connected
            </Tag>
          )}
          {isConnected === false && (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Disconnected
            </Tag>
          )}
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      style={{ top: 20 }}
      styles={{
        body: {
          padding: 0,
          height: "75vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
      className="chatbot-modal"
    >
      <div className="chatbot-quick-actions">
        <Space wrap>
          <Button
            size="small"
            type="default"
            icon={<BulbOutlined />}
            onClick={() => handleQuickAction("suggest")}
            disabled={!isConnected}
          >
            Job Suggestions
          </Button>
          <Button
            size="small"
            type="default"
            icon={<FileTextOutlined />}
            onClick={() => handleQuickAction("cv-tips")}
            disabled={!isConnected}
          >
            CV Tips
          </Button>
          <Button
            size="small"
            type="default"
            icon={<ThunderboltOutlined />}
            onClick={() => handleQuickAction("interview")}
            disabled={!isConnected}
          >
            Interview Prep
          </Button>
          <Button
            size="small"
            icon={<ClearOutlined />}
            onClick={handleClearChat}
            disabled={messages.length <= 1}
          >
            Clear Chat
          </Button>
        </Space>
      </div>

      {/* Messages */}
      <div className="chatbot-messages scrollbar-hide">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-wrapper ${
              msg.role === "user" ? "message-user" : "message-assistant"
            }`}
          >
            <div className="message-avatar">
              <Avatar
                icon={
                  msg.role === "user" ? <UserOutlined /> : <RobotOutlined />
                }
                style={{
                  backgroundColor: msg.role === "user" ? "#15803d" : "#0f766e",
                }}
                size="small"
              />
            </div>
            <div className="message-bubble">
              <div className="message-sender">
                <Text strong style={{ fontSize: 12 }}>
                  {msg.role === "user" ? "You" : "AI Assistant"}
                </Text>
                <Text type="secondary" style={{ fontSize: 11, marginLeft: 8 }}>
                  {formatTime(msg.timestamp)}
                </Text>
              </div>
              <div
                className={`message-text ${msg.isError ? "message-error" : ""}`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-wrapper message-assistant">
            <div className="message-avatar">
              <Avatar
                icon={<RobotOutlined />}
                style={{ backgroundColor: "#0f766e" }}
                size="small"
              />
            </div>
            <div className="message-bubble">
              <Space>
                <Spin size="small" />
                <Text type="secondary">AI is thinking...</Text>
              </Space>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chatbot-input">
        <Space.Compact style={{ width: "100%" }}>
          <TextArea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={
              isConnected
                ? "Type a message... (Shift + Enter for new line)"
                : "Connecting to AI..."
            }
            autoSize={{ minRows: 1, maxRows: 3 }}
            disabled={loading || !isConnected}
            style={{ resize: "none" }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            loading={loading}
            disabled={!isConnected || !inputMessage.trim()}
            style={{ height: "auto", color: "white" }}
          >
            Send
          </Button>
        </Space.Compact>
      </div>
    </Modal>
  );
};

export default Chatbot;
