export type MessageType = {
  role: "user" | "assistant";
  content: string;
  timestamp: string | number;
};

export type ConversationType = {
  conversation: MessageType[];
  context_summary: string;
  sources: string[];
};
