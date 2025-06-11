import sampleConversation from "../sampleResponse";
import Message from "./Message";

interface MessagingLayoutProps {}

const MessagingLayout = () => {
  return sampleConversation.conversation.map((message, index) => {
    const isUser = message.role === "user";
    return (
      <Message
        content={message.content}
        timestamp={message.timestamp}
        sender={message.role}
        key={index}
      />
    );
  });
};

export default MessagingLayout;
