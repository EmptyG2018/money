import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { useAgentSetting } from "@plugins/agent";
import { useRequest } from "ahooks";
import { LoginAccount } from "@services/user";
import { useUser } from "@hooks/user";
import { useRedirectPath } from "@hooks/recordPath";

const ComponentRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1677ff;
`;

const LoginCard = styled(Card)`
  max-width: 340px;
  @media (min-width: 601px) {
    & {
      max-width: 375px;
    }
  }
`;

const CardTop = styled.div`
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  line-height: 44px;
`;

const Logo = styled.img`
  width: 44px;
  height: 44px;
  margin-inline-end: 16px;
  vertical-align: top;
`;

const Title = styled.span`
  position: relative;
  inset-block-start: 2px;
  font-weight: 600;
  font-size: 30px;
`;

const Description = styled.div`
  margin-block-start: 12px;
  margin-block-end: 40px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
`;

const Component = () => {
  const navigate = useNavigate();
  const { agentSetting } = useAgentSetting();
  const { runAsync: loginAccount } = useRequest(LoginAccount, { manual: true });
  const { login } = useUser();
  const redirectPath = useRedirectPath();
  const [messageApi, contextHolder] = message.useMessage();

  const submit = async (values) => {
    try {
      const { token, userInfo } = await loginAccount(values);
      login(token, userInfo);
      setTimeout(redirectPath, 0);
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <ComponentRoot>
        <LoginCard>
          <CardTop>
            <Header>
              <Logo src={agentSetting?.weblogoUrl || undefined} />
              <Title>{agentSetting?.webname}</Title>
            </Header>
            <Description>{agentSetting?.description}</Description>
          </CardTop>
          <Form size="large" onFinish={submit}>
            <Form.Item
              name="account"
              rules={[
                {
                  required: true,
                  message: "请输入账号！",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="账号" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
            <Form.Item>
              <Button block onClick={() => navigate("/register")}>
                注册
              </Button>
            </Form.Item>
          </Form>
        </LoginCard>
      </ComponentRoot>
    </>
  );
};

export default Component;
