import { Space, Input, Avatar } from "antd";
import { CheckCard } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { GetSearchUser } from "@services/user";

export default ({ onSearch, ...props }) => {
  const {
    data: user,
    runAsync: getSearchUser,
    loading,
  } = useRequest(GetSearchUser, {
    manual: true,
    onSuccess(user) {
      onSearch && onSearch(user);
    },
  });

  return (
    <Space
      size={6}
      direction="vertical"
      style={{ display: "flex", width: "100%" }}
      {...props}
    >
      <Input.Search
        style={{ width: "100%" }}
        placeholder="输入用户名或邮箱"
        loading={loading}
        onSearch={(value) => getSearchUser({ account: value })}
      />
      {!!user && (
        <CheckCard
          style={{ width: "100%" }}
          avatar={<Avatar src={user.photoUrl} />}
          title={user.userName}
          description={user.account}
          checked
        />
      )}
    </Space>
  );
};
