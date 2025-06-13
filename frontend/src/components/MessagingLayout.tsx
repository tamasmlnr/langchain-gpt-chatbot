import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Message from "./Message";
import Textbox from "./Textbox";
import { selectContextIsSet } from "../redux/contextSelector";
import UploadContext from "./UploadContext";
import { selectMessages } from "../redux/messagesSelector";
import { useSendMessageMutation } from "../queries/useSendMessageMutation";

interface MessagingLayoutProps {}

const MessagingLayout = () => {
  const isContextSet = useSelector(selectContextIsSet);
  const messages = useSelector(selectMessages);
  const sendMessageMutation = useSendMessageMutation();
  const { isPending } = sendMessageMutation;
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  return isContextSet ? (
    <div
      style={{
        width: "50vw",
        height: "70vh",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          width: "calc(50vw + 1rem)",
          overflowY: "auto",
          padding: "0px",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1;
          return (
            <div key={index} ref={isLastMessage ? lastMessageRef : null}>
              <Message
                content={message.content}
                timestamp={message.timestamp}
                sender={message.role}
              />
            </div>
          );
        })}
        {isPending && (
          <div ref={lastMessageRef}>
            <Message
              content="Thinking..."
              timestamp={new Date().toISOString()}
              sender="assistant"
              isLoading
            />
          </div>
        )}
      </div>

      <div style={{ width: "50vw" }}>
        <Textbox sendMessageMutation={sendMessageMutation} />
      </div>
    </div>
  ) : (
    <UploadContext />
  );
};

export default MessagingLayout;
