import {
  ProForm,
  ProFormUploadButton,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProCard,
} from "@ant-design/pro-components";

const Component = () => {
  return (
    <ProCard title="修改密码">
      <ProForm
        layout="vertical"
        onFinish={(values) => {
          console.log(values);
        }}
        initialValues={{
          name: "蚂蚁设计有限公司",
          useMode: "chapter",
        }}
      >
        <ProFormText.Password
          width="md"
          name="name"
          label="旧密码"
          placeholder="昵称"
        />
        <ProFormText.Password
          width="md"
          name="name"
          label="新密码"
          placeholder="邮箱"
        />
      </ProForm>
    </ProCard>
  );
};

export default Component;
