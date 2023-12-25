import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { setCollapsed } from "@stores/collectionReducer";

export default () => {
  const { collapsed } = useSelector(({ collection }) => collection);
  const dispatch = useDispatch();

  return (
    <Button
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      type="text"
      onClick={() => dispatch(setCollapsed(!collapsed))}
    />
  );
};
