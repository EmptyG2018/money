import { useRef } from "react";
import { Modal, Form, Input } from "antd";

export const EditModal = ({ title, isEdit, ...props }) => {
  return (
    <Modal
      title={`${isEdit ? "重命名" : "创建"}${title}`}
      closeIcon={false}
      destroyOnClose
      {...props}
    />
  );
};

export default ({
  rowKey,
  record,
  confirmLoading,
  onSubmit,
  children,
  form,
  ...props
}) => {
  const formRef = useRef();
  const isEdit = record && !!record[rowKey];

  return (
    <EditModal
      isEdit={isEdit}
      closeIcon={false}
      destroyOnClose
      confirmLoading={
        typeof confirmLoading === "function"
          ? confirmLoading(isEdit)
          : confirmLoading
      }
      onOk={() => {
        if (onSubmit) {
          formRef.current.validateFields().then((values) => {
            onSubmit(values, isEdit, record);
          });
        }
      }}
      {...props}
    >
      <Form ref={formRef} initialValues={record} preserve={false} {...form}>
        <Form.Item name={rowKey} hidden>
          <Input type="hidden" />
        </Form.Item>
        {children}
      </Form>
    </EditModal>
  );
};
