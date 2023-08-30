import useSWR from "swr";
import request from "../services/_request";

export const useVipKey = (arg) => {
  return useSWR(["/admincode/getYunGroupCodeList", arg], ([url, arg]) =>
    request(
      { url, method: "POST", data: arg },
      {
        responseDataType: "json",
        carry: ["auth", "site"],
      }
    )
  );
};
