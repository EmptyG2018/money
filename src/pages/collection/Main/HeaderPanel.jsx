import { Row, Col, Input, Dropdown, Button } from "antd";
import {
  StarFilled,
  DownOutlined,
  PictureOutlined,
  AlignLeftOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

export const ACTION_MENUS = [
  { key: "0", icon: <LinkOutlined />, label: "链接" },
  { key: "1", icon: <PictureOutlined />, label: "图片" },
  { key: "2", icon: <AlignLeftOutlined />, label: "文本" },
];

export const CreateActionsBtn = ({ onClick }) => {
  return (
    <Dropdown menu={{ items: ACTION_MENUS, onClick }}>
      <Button type="primary" icon={<StarFilled />}>
        添加
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export const ResourceSearch = ({ ...props }) => (
  <Input.Search style={{ width: 360 }} {...props} />
);

const HeaderTop = styled.div`
  padding: 8px 16px;
`;

export const HeaderPanel = ({ title, extend }) => {
  return (
    <HeaderTop>
      <Row justify="space-between" align="middle">
        <Col>{title}</Col>
        <Col>{extend}</Col>
      </Row>
    </HeaderTop>
  );
};
