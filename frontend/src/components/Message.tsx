import Icon from "./Icon";
import aiIcon from "../assets/Icons/robot.svg";
import humanIcon from "../assets/Icons/human.svg";
import TypingDots from "./TypingDots";

interface MessageProps {
  content: string;
  timestamp: string | number;
  sender: "user" | "assistant";
  isLoading?: boolean;
}

const Message = ({
  content,
  timestamp,
  sender,
  isLoading = false,
}: MessageProps) => {
  const isUser = sender === "user";
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
