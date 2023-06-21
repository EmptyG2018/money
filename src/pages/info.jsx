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
    <ProCard title="基础信息" colSpan={{ xs: 24, md: 18 }}>
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
        <ProFormUploadButton
          name="upload"
          label="头像"
          max={1}
          fieldProps={{
            name: "file",
            listType: "picture-card",
          }}
          action="/upload.do"
        />
        <ProFormText width="sm" name="name" label="昵称" placeholder="昵称" />
        <ProFormText width="md" name="name" label="邮箱" placeholder="邮箱" />
        <ProFormTextArea
          width="lg"
          name="name"
          label="简介"
          placeholder="简介"
        />
        <ProFormSelect
          width="sm"
          label="跳转类型"
          valueEnum={{
            home: "首页",
            work: "工作台",
          }}
        ></ProFormSelect>
      </ProForm>
    </ProCard>
  );
};

export default Component;
