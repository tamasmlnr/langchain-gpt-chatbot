import Icon from "./Icon";
import aiIcon from "../assets/Icons/robot.svg";
import humanIcon from "../assets/Icons/human.svg";

interface MessageProps {
  content: string;
  timestamp: string | number;
  sender: "user" | "assistant";
  isLoading: boolean;
}

const Message = ({
  content,
  timestamp,
  sender,
  isLoading = false,
}: MessageProps) => {
  const isUser = sender === "user";

  const TypingDots = () => (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {[0, 0.2, 0.4].map((delay, i) => (
        <div
          key={i}
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#666",
            margin: "2rem 0",
            borderRadius: "50%",
            animation: `typing 1.4s infinite ease-in-out ${delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        margin: "10px 0",
        width: "50vw",
      }}
    >
      <Icon source={isUser ? humanIcon : aiIcon} size="30px" />
      <div
        style={{
          backgroundColor: "grey",
          padding: "15px",
          borderRadius: "30px",
          textAlign: isUser ? "right" : "left",
          flexGrow: 1,
          wordBreak: "break-word",
        }}
      >
        <div>
          <strong>{isUser ? "User" : "Assistant"}:</strong>{" "}
          {isLoading && !isUser ? <TypingDots /> : content}
        </div>
        {!isLoading && (
          <div style={{ fontSize: "0.8em", color: "#fff" }}>
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
