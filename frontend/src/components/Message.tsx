import React from "react";
import Icon from "./Icon";

interface MessageProps {
  content: string;
  timestamp: string;
  sender: "user" | "assistant";
}
const Message = ({ content, timestamp, sender }: MessageProps) => {
  const isUser = sender === "user";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        justifyContent: isUser ? "flex-end" : "flex-start",
        gap: "12px",
        margin: "10px 0",
        width: "100%",
      }}
    >
      <Icon sender={sender} />
      <div
        style={{
          backgroundColor: "grey",
          padding: "10px",
          borderRadius: "50px",
          textAlign: "left",
          flex: 1,
        }}
      >
        <div>
          <strong>{isUser ? "User" : "Assistant"}:</strong>
          {content}
        </div>
        <div style={{ fontSize: "0.8em", color: "#fff" }}>
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Message;
