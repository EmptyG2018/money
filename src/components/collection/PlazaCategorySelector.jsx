import { Select } from "antd";
import { useRequest } from "ahooks";
import { GetPlazaCategorys } from "@services/collection/plaza";

export default ({ ...props }) => {
  const { data: categorys } = useRequest(GetPlazaCategorys);

  return (
    <Select placeholder="分类" {...props}>
      {(categorys || []).map((item) => (
        <Select.Option value={item.id}>{item.title}</Select.Option>
      ))}
    </Select>
  );
};
