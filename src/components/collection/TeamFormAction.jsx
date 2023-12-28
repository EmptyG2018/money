import { useRef } from "react";
import { Modal, Form, Input, message } from "antd";
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { UploadFile } from "@services/upload";
import EditFormModal from "./EditFormModal";
import PlazaCategorySelector from "./PlazaCategorySelector";

export const CreateTeamFormModal = ({ onSubmit, ...props }) => {
  const formRef = useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const { runAsync: uploadAssets } = useRequest(UploadFile, { manual: true });

  const uploadImg = async (e) => {
    const formData = new FormData();
    formData.append("imgType", 0);
    formData.append("myFile", e.file);
    try {
      const res = await uploadAssets(formData);
      formRef.current.setFieldsValue({
        iconUri: [{ uid: "-1", status: "done", url: res?.fullUrl }],
      });
    } catch (err) {
      messageApi.error(err.message);
    }
    return false;
  };

  return (
    <>
      {contextHolder}

      <Modal
        closeIcon={false}
        destroyOnClose
        width={460}
        title="创建团队"
        onOk={() => {
          if (onSubmit) {
            formRef.current.validateFields().then((values) => {
              onSubmit(values);
            });
          }
        }}
        {...props}
      >
        <ProForm
          formRef={formRef}
          layout="vertical"
          preserve={false}
          submitter={{
            render: false,
          }}
        >
          <ProFormUploadButton
            name="iconUri"
            label="封面"
            max={1}
            extra="支持jpg, png, gif, jpeg类型图片"
            fieldProps={{
              listType: "picture-card",
              multiple: false,
              customRequest: uploadImg,
            }}
            rules={[
              {
                required: true,
                message: "请上传封面",
              },
            ]}
          />
          <ProFormText
            width="sm"
            name="title"
            label="团队名称"
            placeholder="团队名称"
            rules={[
              {
                required: true,
                message: "请输入团队名称",
              },
            ]}
          />
          <ProFormTextArea
            name="description"
            label="团队简介"
            placeholder="团队简介"
          />
          <ProFormRadio.Group
            name="isPublic"
            label="可见性范围"
            options={[
              {
                label: "公开任何人都可以查看",
                value: 1,
              },
              {
                label: " 私有非成员团队无法访问私有团队",
                value: 0,
              },
            ]}
            rules={[{ required: true, message: "请选择可见性范围" }]}
          />
        </ProForm>
      </Modal>
    </>
  );
};

export const WebsiteEditFormModal = ({ ...props }) => {
  return (
    <EditFormModal rowKey="id" width={380} title="网址" {...props}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "请输入网址名称" }]}
      >
        <Input placeholder="网址名称" />
      </Form.Item>
      <Form.Item
        name="classId"
        rules={[{ required: true, message: "请选择分类" }]}
      >
        <PlazaCategorySelector />
      </Form.Item>
    </EditFormModal>
  );
};
