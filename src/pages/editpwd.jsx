import { useRef } from "react";
import { Button, message } from "antd";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { UpdateUserPwd } from "@services/user";

const Component = () => {
  const editpwdForm = useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const { runAsync: updateUserPwd } = useRequest(UpdateUserPwd, {
    manual: true,
  });

  const submit = async (values) => {
    try {
      await updateUserPwd(values);
      messageApi.success("修改成功！");
      editpwdForm.current.resetFields();
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <div style={{ padding: "24px", backgroundColor: "#fff" }}>
        <ProForm
          formRef={editpwdForm}
          layout="vertical"
          onFinish={submit}
          submitter={{
            render: (props, dom) => {
              return (
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              );
            },
          }}
        >
          <ProFormText.Password
            width="md"
            name="oldpwd"
            label="旧密码"
            placeholder="旧密码"
            rules={[
              {
                required: true,
                message: "请输入旧密码",
              },
            ]}
          />
          <ProFormText.Password
            width="md"
            name="newpwd"
            label="新密码"
            placeholder="新密码（不少于8字符）"
            rules={[
              {
                required: true,
                message: "请输入新密码",
              },
            ]}
          />
        </ProForm>
      </div>
    </>
  );
};

export default Component;
