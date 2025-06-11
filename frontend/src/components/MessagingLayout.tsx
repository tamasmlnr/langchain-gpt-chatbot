import { useSelector } from "react-redux";
import sampleConversation from "../sampleResponse";
import Message from "./Message";
import Textbox from "./Textbox";
import { selectContextIsSet } from "../redux/contextSelector";
import UploadContext from "./UploadContext";

interface MessagingLayoutProps {}

const MessagingLayout = () => {
  const isContextSet = useSelector(selectContextIsSet);
  console.log("isContextSet:", isContextSet);
  return isContextSet ? (
    <>
      {sampleConversation.conversation.map((message, index) => {
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
    </>
  ) : (
    <UploadContext />
  );
};

export default MessagingLayout;
