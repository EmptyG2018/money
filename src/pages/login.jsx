import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { styled } from "styled-components";
import { useAgentSetting } from "../plugins/agent";
import { useRequest } from "ahooks";
import { LoginAccount } from "../services/user";
import { useUser } from "../hooks/user";

const ComponentRoot = styled.div`
  padding-block: 40px;
`;

const Component = () => {
  const loginForm = useRef();
  const navigate = useNavigate();
  const { agentSetting } = useAgentSetting();
  const { runAsync: loginAccount } = useRequest(LoginAccount, { manual: true });
  const { login } = useUser();
  const [messageApi, contextHolder] = message.useMessage();

  const submit = async (values) => {
    try {
      const { token, userInfo } = await loginAccount(values);
      login(token, userInfo);
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
          logo={agentSetting?.weblogoUrl || undefined}
          title={agentSetting?.webname}
          subTitle={agentSetting?.description}
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
