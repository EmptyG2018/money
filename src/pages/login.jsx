import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { styled } from "styled-components";
import { useProfile, useSyncInfo } from "../hooks/user";

const ComponentRoot = styled.div`
  padding-block: 40px;
`;

const Component = () => {
  const loginForm = useRef();
  const navigate = useNavigate();
  const { login } = useProfile();
  const { sync: syncInfo } = useSyncInfo();
  const [messageApi, contextHolder] = message.useMessage();

  const submit = async () => {
    const { account, password } = loginForm.current.getFieldsFormatValue();
    try {
      const {
        result: { token, userInfo },
      } = await login({ account, password });
      syncInfo(token, userInfo);
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <ComponentRoot>
        <LoginForm
          formRef={loginForm}
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Github"
          subTitle="全球最大的代码托管平台"
          actions={
            <Button block size="large" onClick={() => navigate("/register")}>
              注册
            </Button>
          }
          onFinish={submit}
        >
          <ProFormText
            name="account"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"账号"}
            rules={[
              {
                required: true,
                message: "请输入账号！",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={"密码"}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
        </LoginForm>
      </ComponentRoot>
    </>
  );
};

export default Component;
