const TypingDots: React.FC = () => (
  <>
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {[0, 0.2, 0.4].map((delay, i) => (
        <div
          key={i}
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#666",
            margin: "2rem 0",
            borderRadius: "50%",
            animation: `typing 1.4s infinite ease-in-out ${delay}s`,
          }}
        />
      ))}
    </div>
    <style>{`
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
  </>
);
export default TypingDots;
