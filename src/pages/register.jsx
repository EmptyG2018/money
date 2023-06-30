import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { styled } from "styled-components";
import { useRegister } from "../hooks/user";

const ComponentRoot = styled.div`
  padding-block: 40px;
`;

const RegisterForm = styled(LoginForm)`
  & > button:last-child {
    display: none !important;
  }
`;

const FormExtra = styled.div`
  margin-block-end: 24px;
`;

const Component = () => {
  const registerForm = useRef();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { register } = useRegister();

  const submit = async () => {
    await registerForm.current.validateFieldsReturnFormatValue();
    const formData = registerForm.current.getFieldsFormatValue();
    try {
      await register({
        dlId: 0,
        ...formData,
      });
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
        <RegisterForm
          formRef={registerForm}
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Github"
          subTitle="全球最大的代码托管平台"
          actions={
            <Button block type="primary" size="large" onClick={submit}>
              注册
            </Button>
          }
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
                message: "请输入账号!",
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
          <ProFormText
            name="userName"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"用户名"}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <ProFormText
            name="email"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"邮箱"}
            rules={[
              {
                required: true,
                message: "请输入邮箱!",
              },
            ]}
          />
          <FormExtra
            style={{
              marginBlockEnd: 24,
            }}
          >
            已经有账号？
            <Link to="/login">登录</Link>
          </FormExtra>
        </RegisterForm>
      </ComponentRoot>
    </>
  );
};

export default Component;
