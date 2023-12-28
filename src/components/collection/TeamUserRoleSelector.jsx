import { Select } from "antd";
import { useRequest } from "ahooks";
import { GetTeamRoles } from "@services/collection/team";

export default ({ onSearch, ...props }) => {
  const { data: roles } = useRequest(GetTeamRoles);

  return (
    <Select
      options={(roles || []).map((item) => ({
        label: item.name,
        value: item.id,
      }))}
      {...props}
    />
  );
};
