import useSWRMutation from "swr/mutation";
import fetch from "../utils/fetch";

export const useUploadFile = () => {
  const { data, trigger } = useSWRMutation(
    "/upload/uploadFile",
    (url, { arg }) =>
      fetch({
        url,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: arg,
      }, true)
  );

  return { upload: trigger };
};
