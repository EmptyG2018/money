import { useEffect, useRef } from "react";
import { Button, message } from "antd";
import {
  ProForm,
  ProFormUploadButton,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { UploadFile } from "../services/upload";
import {
  GetProfileSetting,
  UpdateProfileSetting,
  GetPublicToUrl,
} from "../services/user";

const Component = () => {
  const infoRef = useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: profile } = useRequest(GetProfileSetting);
  const { data: urls } = useRequest(GetPublicToUrl);
  const { runAsync: updateProfile } = useRequest(UpdateProfileSetting, {
    manual: true,
  });
  const { runAsync: uploadAvatar } = useRequest(UploadFile, { manual: true });

  useEffect(() => {
    profile &&
      infoRef.current.setFieldsValue({
        photoUrl: [{ uid: "-1", url: profile.photoUrl, status: "done" }],
        username: profile.username,
        email: profile.email,
        introduce: profile.introduce,
        goType: profile.goType,
      });
  }, [profile]);

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("imgType", 0);
    formData.append("myFile", e.file);
    try {
      const result = await uploadAvatar(formData);
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
      await updateProfile({ photoUrl: photoUrl[0].url, ...formData });
      messageApi.success("修改成功！");
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <div style={{ padding: "24px", backgroundColor: "#fff" }}>
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
      </div>
    </>
  );
};

export default Component;
