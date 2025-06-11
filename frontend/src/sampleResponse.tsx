const sampleConversation = {
  conversation: [
    {
      role: "user",
      content: "What is the main topic of the uploaded document?",
      timestamp: "2025-06-11T10:15:00Z",
    },
    {
      role: "assistant",
      content:
        "The main topic of the uploaded document is the impact of climate change on agriculture.",
      source: "uploaded_file.pdf",
      timestamp: "2025-06-11T10:15:01Z",
    },
  ],
  context_summary: "Climate change and agriculture",
  sources: ["uploaded_file.pdf"],
};

export default sampleConversation;
