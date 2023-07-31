import { useRef } from "react";
import { Button, message } from "antd";
import {
  ProForm,
  ProFormUploadButton,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from "@ant-design/pro-components";
import { useGetEditUser, usePublicGoUrl, useEditUser } from "../hooks/user";
import { useUploadFile } from "../hooks/file";
import { useEffect } from "react";

const Component = () => {
  const infoRef = useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const { upload } = useUploadFile();
  const { user } = useGetEditUser();
  const { urls } = usePublicGoUrl();
  const { edit } = useEditUser();

  useEffect(() => {
    user &&
      infoRef.current.setFieldsValue({
        photoUrl: [{ uid: "-1", url: user.photoUrl, status: "done" }],
        username: user.username,
        email: user.email,
        introduce: user.introduce,
        goType: user.goType,
      });
  }, [user]);

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("imgType", 0);
    formData.append("myFile", e.file);
    try {
      const result = await upload(formData);
      infoRef.current.setFieldsValue({
        photoUrl: [{ uid: "-1", status: "done", url: result?.result?.fullUrl }],
      });
    } catch (err) {
      messageApi.error(err.message);
    }

    return false;
  };

  const submit = async ({ photoUrl, ...formData }) => {
    try {
      await edit({ photoUrl: photoUrl[0].url, ...formData });
      messageApi.success("修改成功！");
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <ProForm
        formRef={infoRef}
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
        <ProFormUploadButton
          name="photoUrl"
          label="头像"
          max={1}
          fieldProps={{
            listType: "picture-card",
            multiple: false,
            customRequest: uploadFile,
          }}
          rules={[
            {
              required: true,
              message: "请上传头像",
            },
          ]}
        />
        <ProFormText
          width="sm"
          name="username"
          label="昵称"
          placeholder="昵称"
          rules={[
            {
              required: true,
              message: "请输入昵称",
            },
          ]}
        />
        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          placeholder="邮箱"
          rules={[
            {
              required: true,
              message: "请输入邮箱",
            },
          ]}
        />
        <ProFormTextArea
          width="lg"
          name="introduce"
          label="简介"
          placeholder="简介"
        />
        <ProFormSelect
          width="sm"
          name="goType"
          label="跳转类型"
          fieldProps={{
            options: (urls?.result || []).map((item) => ({
              label: item.name,
              value: item.id,
            })),
          }}
          rules={[
            {
              required: true,
              message: "请选择跳转类型",
            },
          ]}
        ></ProFormSelect>
      </ProForm>
    </>
  );
};

export default Component;
