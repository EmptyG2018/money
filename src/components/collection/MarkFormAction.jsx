import { useState, useEffect } from "react";
import { Form, Input } from "antd";
import MarkdownEditor from "@uiw/react-markdown-editor";
import EditFormModal, {
  EditModal,
} from "./EditFormModal";
import styled from "styled-components";

export const LinkEditFormModal = ({ record, ...props }) => {
  const rowKey = "id";
  const isEdit = record && !!record[rowKey];

  return (
    <EditFormModal
      rowKey={rowKey}
      width={480}
      title="链接"
      record={record}
      {...props}
    >
      {isEdit ? (
        <>
          <Form.Item label="标题" name="title">
            <Input placeholder="标题" />
          </Form.Item>
          <Form.Item label="封面" name="imageUrl">
            <Input placeholder="封面" />
          </Form.Item>
          <Form.Item label="图标" name="icon">
            <Input placeholder="图标" />
          </Form.Item>
        </>
      ) : (
        <Form.Item
          label="URL"
          name="domain"
          rules={[{ required: true, message: "请输入URL" }]}
        >
          <Input placeholder="https://" />
        </Form.Item>
      )}
    </EditFormModal>
  );
};

export const ImgEditFormModal = ({ ...props }) => {
  return (
    <EditFormModal rowKey="id" width={480} title="图片" {...props}>
      <Form.Item
        name="domain"
        label="图片地址"
        rules={[{ required: true, message: "请输入图片地址" }]}
      >
        <Input placeholder="https://" />
      </Form.Item>
    </EditFormModal>
  );
};

const TitleInput = styled.input`
  display: block;
  font-size: 22px;
  font-weight: 600;
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  margin-bottom: 4px;
`;

const ErrorTip = styled.p`
  margin: 0;
  padding: 2px 6px;
  color: red;
  font-size: 13px;
  line-height: 22px;
`;

export const WordEditFormModal = ({ open, record, onSubmit, ...props }) => {
  const rowKey = "id";
  const isEdit = record && !!record[rowKey];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errorFields, setErrorFields] = useState({
    title: false,
    description: false,
  });

  useEffect(() => {
    open &&
      setFormData({
        title: record?.title,
        description: record?.description,
      });
  }, [open, record]);

  return (
    <EditModal
      open={open}
      width={760}
      isEdit={isEdit}
      title="文本"
      onOk={() => {
        if (!formData.title)
          return setErrorFields({ ...errorFields, title: true });
        if (!formData.description)
          return setErrorFields({ ...errorFields, description: true });
        onSubmit(formData, isEdit, record);
      }}
      {...props}
    >
      <div style={{ marginBottom: "20px" }}>
        <TitleInput
          type="text"
          value={formData.title}
          placeholder="标题"
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            setErrorFields({ ...errorFields, title: !e.target.value });
          }}
        />
        {errorFields.title && <ErrorTip>请输入标题</ErrorTip>}
      </div>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <MarkdownEditor
          value={formData.description}
          placeholder="文本内容"
          minHeight="270px"
          maxHeight="500px"
          onChange={(value) => {
            setFormData({ ...formData, description: value });
            setErrorFields({ ...errorFields, description: !value });
          }}
        />

        {errorFields.description && <ErrorTip>请输入文本内容</ErrorTip>}
      </div>
    </EditModal>
  );
};