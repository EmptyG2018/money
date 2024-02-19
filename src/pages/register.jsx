import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { useAgentSetting } from "@plugins/agent";
import { useRequest } from "ahooks";
import { RegisterAccount } from "@services/user";

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

const FormExtra = styled.div`
  margin-block-end: 24px;
`;

const Component = () => {
  const registerForm = useRef();
  const navigate = useNavigate();
  const { agentSetting } = useAgentSetting();
  const [messageApi, contextHolder] = message.useMessage();
  const { runAsync: registerAccount } = useRequest(RegisterAccount, {
    manual: true,
  });

  const submit = async (values) => {
    try {
      await registerAccount(values);
      messageApi.success("注册成功！");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 800);
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
                  message: "请输入邮箱账号！",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="邮箱账号" />
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
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: "请输入用户名！",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
            <FormExtra>
              已经有账号？
              去<Link to="/login">登录</Link>吧
            </FormExtra>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                注 册
              </Button>
            </Form.Item>
          </Form>
        </LoginCard>
      </ComponentRoot>
    </>
  );
};

export default Component;
