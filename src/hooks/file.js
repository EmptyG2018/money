import useSWRMutation from "swr/mutation";
import request from "../services/_request";

export const useUploadFile = () => {
  const { data, trigger } = useSWRMutation(
    "/upload/uploadFile",
    (url, { arg }) =>
      request(
        {
          url,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: arg,
        },
        {
          responseDataType: "json",
          carry: ["auth", "site"],
        }
      )
  );

  return { upload: trigger };
};
