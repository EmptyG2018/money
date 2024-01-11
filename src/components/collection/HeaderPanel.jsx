import { Flex, Input, Dropdown, Button } from "antd";
import {
  StarFilled,
  DownOutlined,
  PictureOutlined,
  AlignLeftOutlined,
  LinkOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

export const ACTION_MENUS = [
  { key: "0", icon: <LinkOutlined />, label: "链接" },
  { key: "1", icon: <PictureOutlined />, label: "图片" },
  { key: "2", icon: <AlignLeftOutlined />, label: "文本" },
  { type: "divider" },
  { key: "3", icon: <ImportOutlined />, label: "导入书签" },
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
  <Input.Search style={{ maxWidth: 360 }} {...props} />
);

const HeaderTop = styled.div`
  padding: 8px 16px;
`;

export const HeaderPanel = ({ title, extend, ...props }) => {
  return (
    <HeaderTop {...props}>
      <Flex align="center" gap={16}>
        <Flex flex="1 0 0" align="center" gap={8}>
          {title}
        </Flex>
        <Flex>{extend}</Flex>
      </Flex>
    </HeaderTop>
  );
};
