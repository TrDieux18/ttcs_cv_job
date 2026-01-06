import { useState } from "react";
import { FloatButton, Tooltip } from "antd";
import { RobotOutlined, CloseOutlined } from "@ant-design/icons";
import Chatbot from "./Chatbot";

const ChatbotWidget = () => {
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Tooltip
        placement="left"
        title={visible ? "Close AI Assistant" : "Open AI Assistant"}
      >
        <FloatButton
          icon={visible ? <CloseOutlined /> : <RobotOutlined />}
          type="primary"
          style={{
            right: 24,
            bottom: 24,
            width: 56,
            height: 56,
            background: visible
              ? "linear-gradient(to right, #dc2626, #991b1b)"
              : "linear-gradient(to right, #15803d, #0f766e)",
            border: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
          
          onClick={handleToggle}
        />
      </Tooltip>

      <Chatbot visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

export default ChatbotWidget;
