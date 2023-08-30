import request from "./_request";

export const GetVipGroups = () => {
  return request(
    { url: "/yunUserGroup/getList", method: "POST" },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
};
