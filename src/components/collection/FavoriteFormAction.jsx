import { Modal, Form, Input, Select } from "antd";
import { GetPlazaCategorys } from "@services/collection/plaza";
import EditFormModal from "./EditFormModal";

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

export const PlazaFormModal = ({ ...props }) => {
  return (
    <Modal
      closeIcon={false}
      destroyOnClose
      width={480}
      title="申请加入广场"
      {...props}
    >
      <Form>
        <Form.Item hidden name="id">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item type="classId">
          <Select>
            <Option value="USD">$</Option>
            <Option value="CNY">¥</Option>
          </Select>
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
