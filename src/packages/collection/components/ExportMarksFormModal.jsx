import { useRef } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";

const Component = ({ onSubmit, ...props }) => {
  const formRef = useRef();

  return (
    <Modal
      closeIcon={false}
      destroyOnClose
      width={460}
      title="导入书签"
      onOk={() => {
        if (onSubmit) {
          formRef.current.validateFields().then((values) => {
            onSubmit(values);
          });
        }
      }}
      {...props}
    >
      <Form ref={formRef} preserve={false}>
        <Form.Item
          label="群组"
          name="groupName"
          rules={[{ required: true, message: "请输入群组名称" }]}
        >
          <Input placeholder="群组名称" />
        </Form.Item>
        <Form.Item
          label="文件"
          name="file"
          rules={[{ required: true, message: "请上传文件" }]}
        >
          <Upload
            maxCount={1}
            beforeUpload={() => {
              return false;
            }}
          >
            <Button block>请上传文件</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Component;
