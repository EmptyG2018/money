import { Form, Input } from "antd";
import EditFormModal from "../../../components/collection/EditFormModal";

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
