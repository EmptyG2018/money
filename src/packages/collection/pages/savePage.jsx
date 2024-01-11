import { useState } from "react";
import { Form, Input } from "antd";
import MarkdownEditor from "@uiw/react-markdown-editor";
import styled from "styled-components";

const LinkForm = () => {
  return (
    <Form>
      <Form.Item
        label="URL"
        name="domain"
        rules={[{ required: true, message: "请输入URL" }]}
      >
        <Input placeholder="https://" />
      </Form.Item>
    </Form>
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

const WorkForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errorFields, setErrorFields] = useState({
    title: false,
    description: false,
  });

  return (
    <>
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
    </>
  );
};

export default ({ type }) => {
  return (
    <>
      {type === "link" && <LinkForm />}
      {type === "word" && <WorkForm />}
    </>
  );
};
