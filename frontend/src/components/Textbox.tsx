import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/messagesSlice";
import { useSendMessageMutation } from "../queries/useSendMessageMutation";

interface SimpleTextboxProps {
  placeholder?: string;
  onSubmit?: (text: string) => void;
  initialValue?: string;
}

const Textbox: React.FC<SimpleTextboxProps> = ({
  placeholder = "Enter your text here...",
  initialValue = "",
}) => {
  const [text, setText] = useState<string>(initialValue);
  const dispatch = useDispatch();
  const { mutate: sendMessageMutation, isPending } = useSendMessageMutation();
  const isDisabled = !text.trim() || isPending;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const handleSubmit = (): void => {
    if (!isDisabled) {
      dispatch(
        addMessage({
          role: "user",
          content: text,
          timestamp: new Date().toISOString(),
        })
      );
      sendMessageMutation(text);
      setText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div style={{ margin: "10vh 0 auto", width: "100%" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: "10px",
            width: "100%",
            fontSize: "16px",
            border: "2px solid #ddd",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          style={{
            padding: "10px 12px",
            fontSize: "16px",
            backgroundColor: isDisabled ? "grey" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Textbox;
