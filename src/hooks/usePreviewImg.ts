import React, { useState } from "react";
import useShowToast from "../store/toast";

function usePreviewImg() {
  const [selectedFile, setSelectedFile] = useState<ArrayBuffer | string | null>(
    null
  );

  const { showToast } = useShowToast();

  const MAXFILEINBYTES = 2 * 1024 * 1024;

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) {
      showToast("No file selected", "Error");
      return;
    }
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > MAXFILEINBYTES) {
        showToast("File size must be 2MB or less", "Error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("File Not an Image", "Error");
      return;
    }
  }
  return {
    setSelectedFile,
    handleImageChange,
    selectedFile,
  };
}

export default usePreviewImg;
