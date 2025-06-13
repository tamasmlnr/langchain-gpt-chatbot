import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "../constants";
import { addMessage } from "../redux/messagesSlice";
import { useDispatch } from "react-redux";

const sendMessage = async (message: string) => {
  console.log("Sending message...", message);

  try {
    const response = await fetch(`${BACKEND_URL}/api/messages/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Sending message failed");
    }

    return await response.json();
  } catch (error) {
    console.log("Error sending message:", error);
    throw error;
  }
};

export const useSendMessageMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      console.log(data.message);
      dispatch(
        addMessage({
          role: "assistant",
          content: data.message,
          timestamp: Date.now(),
        })
      );
    },
    onError: (error) => {
      console.error("Upload mutation failed:", error);
    },
  });
};
