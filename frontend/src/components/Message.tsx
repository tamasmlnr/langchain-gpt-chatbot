import React from "react";
import Icon from "./Icon";
import aiICon from "../assets/Icons/robot.svg";
import humanIcon from "../assets/Icons/human.svg";

interface MessageProps {
  content: string;
  timestamp: string | number;
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
        justifyContent: "flex-start",
        gap: "12px",
        margin: "10px 0",
        width: "50vw",
      }}
    >
      <Icon source={isUser ? humanIcon : aiICon} size="30px" />
      <div
        style={{
          backgroundColor: "grey",
          padding: "10px",
          borderRadius: "50px",
          textAlign: "left",
          flexGrow: 1,
          wordBreak: "break-word",
        }}
      >
        <div>
          <strong>{isUser ? "User" : "Assistant"}:</strong> {content}
        </div>
        <div style={{ fontSize: "0.8em", color: "#fff" }}>
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Message;
