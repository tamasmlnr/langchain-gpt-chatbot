const sampleConversation = {
  conversation: [
    // {
    //   role: "user",
    //   content: "What is the main topic of the uploaded document?",
    //   timestamp: "2025-06-11T10:15:00Z",
    // },
    {
      role: "assistant",
      content: "Hello! How can I assist you today?",
      source: "uploaded_file.pdf",
      timestamp: "2025-06-11T10:15:01Z",
    },
  ],
  context_summary: "Climate change and agriculture",
  sources: ["uploaded_file.pdf"],
};

export default sampleConversation;
