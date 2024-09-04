import { axios } from "./axiosClient";

async function uploadFile(file: any, fieldName: string): Promise<string> {
  const formData = new FormData();
  formData.append(fieldName, file);

  try {
    const response = await axios.post<{ url: string }>(
      "/user/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Custom-Header": fieldName,
        },
      }
    );

    if (response.status === 200 && response.data) {
      return response.data.url;
    } else {
      throw new Error("Failed to upload file: " + response);
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    throw error;
  }
}

export { uploadFile };
