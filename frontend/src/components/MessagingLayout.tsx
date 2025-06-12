import { useSelector } from "react-redux";
import Message from "./Message";
import Textbox from "./Textbox";
import { selectContextIsSet } from "../redux/contextSelector";
import UploadContext from "./UploadContext";
import { selectMessages } from "../redux/messagesSelector";

interface MessagingLayoutProps {}

const MessagingLayout = () => {
  const isContextSet = useSelector(selectContextIsSet);
  const messages = useSelector(selectMessages);

  return !isContextSet ? (
    <div
      style={{
        width: "50vw",
        height: "70vh",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {messages.map((message, index) => {
          return (
            <Message
              content={message.content}
              timestamp={message.timestamp}
              sender={message.role}
              key={index}
            />
          );
        })}
        <Textbox />
      </div>
    </div>
  ) : (
    <UploadContext />
  );
};

export default MessagingLayout;
