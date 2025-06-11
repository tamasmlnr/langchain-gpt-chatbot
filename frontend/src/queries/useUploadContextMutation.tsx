import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "../constants";
import { useDispatch } from "react-redux";
import { setContext } from "../redux/contextSlice";

const uploadContext = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  console.log("Uploading file...");

  try {
    const response = await fetch(`${BACKEND_URL}/a`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return await response.json();
  } catch (error) {
    console.log("Error uploading context:", error);
    throw error;
  }
};

export const useUploadContextMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: uploadContext,
    onSuccess: () => {
      dispatch(setContext());
    },
    onError: (error) => {
      console.error("Upload mutation failed:", error);
    },
  });
};
