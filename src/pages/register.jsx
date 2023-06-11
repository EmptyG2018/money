import { Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { styled } from "styled-components";

const ComponentRoot = styled.div`
  padding-block: 40px;
`;

const FormExtra = styled.div`
  margin-block-end: 24px;
`;

const Component = () => {
  return (
    <ComponentRoot>
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="全球最大的代码托管平台"
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
          name="username"
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
          <a>登录</a>
        </FormExtra>
      </LoginForm>
    </ComponentRoot>
  );
};

export default Component;
