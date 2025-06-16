import React, { useRef } from "react";
import { useUploadContextMutation } from "../queries/useUploadContextMutation";
import Icon from "./Icon";
import uploadIcon from "../assets/Icons/upload.svg";

const UploadContext = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    mutate: uploadContextMutation,
    isPending,
    error,
  } = useUploadContextMutation();

  const handleDivClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      uploadContextMutation(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div
      onClick={handleDivClick}
      style={{
        textAlign: "center",
        border: "0.5px solid #ccc",
        padding: "2rem",
        cursor: "pointer",
      }}
    >
      <strong>
        Please start by uploading a PDF file to use as context for the chat.
      </strong>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5rem",
        }}
      >
        <Icon source={uploadIcon} size="70px" />
      </div>
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {isPending && <p>Uploading...</p>}
      {error && <p>Error uploading file</p>}
    </div>
  );
};

export default UploadContext;
