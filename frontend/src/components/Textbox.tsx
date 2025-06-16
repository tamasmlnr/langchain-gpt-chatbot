import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/messagesSlice";
import { useSendMessageMutation } from "../queries/useSendMessageMutation";

interface TextboxProps {
  placeholder?: string;
  initialValue?: string;
  sendMessageMutation: ReturnType<typeof useSendMessageMutation>;
}

const styles = {
  container: { margin: "10vh 0 auto", width: "100%" },
  inputWrapper: { display: "flex", gap: "8px", alignItems: "center" },
  input: {
    flex: 1,
    padding: "10px",
    width: "100%",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  button: (disabled: boolean): React.CSSProperties => ({
    padding: "10px 12px",
    fontSize: "16px",
    backgroundColor: disabled ? "grey" : "#007bff",
    transition: "1s",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
};

const Textbox: React.FC<TextboxProps> = ({
  placeholder = "Enter your text here...",
  initialValue = "",
  sendMessageMutation,
}) => {
  const [text, setText] = useState<string>(initialValue);
  const dispatch = useDispatch();
  const { mutate: mutateMessage, isPending } = sendMessageMutation;
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
      mutateMessage(text);
      setText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={styles.inputWrapper}
      >
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
          type="submit"
          disabled={isDisabled}
          style={{
            padding: "10px 12px",
            fontSize: "16px",
            backgroundColor: isDisabled ? "grey" : "#007bff",
            transition: "1s",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Textbox;
