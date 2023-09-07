import request from "./_request";

export const UploadFile = (payload) =>
  request(
    {
      url: "/upload/uploadFile",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
