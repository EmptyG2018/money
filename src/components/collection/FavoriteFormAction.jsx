import { useRef } from "react";
import { Modal, Form, Input } from "antd";
import EditFormModal from "./EditFormModal";
import PlazaCategorySelector from "./PlazaCategorySelector";

export const CollapseEditFormModal = ({ ...props }) => {
  return (
    <EditFormModal rowKey="id" width={380} title="群组" {...props}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "请输入群组名称" }]}
      >
        <Input placeholder="群组名称" />
      </Form.Item>
    </EditFormModal>
  );
};

export const CollectionEditFormModal = ({ ...props }) => {
  return (
    <EditFormModal rowKey="id" width={380} title="收藏集" {...props}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "请输入收藏集名称" }]}
      >
        <Input placeholder="收藏集名称" />
      </Form.Item>
    </EditFormModal>
  );
};

export const PlazaFormModal = ({ record, onSubmit, ...props }) => {
  const formRef = useRef();

  return (
    <Modal
      closeIcon={false}
      destroyOnClose
      width={460}
      title="申请加入广场"
      onOk={() => {
        if (onSubmit) {
          formRef.current.validateFields().then((values) => {
            onSubmit(values);
          });
        }
      }}
      {...props}
    >
      <Form ref={formRef} initialValues={record} preserve={false}>
        <Form.Item hidden name="id">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item
          label="分类"
          name="classId"
          rules={[{ required: true, message: "请选择分类" }]}
        >
          <PlazaCategorySelector />
        </Form.Item>
        <Form.Item
          label="简介"
          name="description"
          rules={[{ required: true, message: "请输入简介" }]}
        >
          <Input.TextArea placeholder="简介" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
