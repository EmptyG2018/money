import { Card, Typography, Flex, Avatar, Row, Col, Button } from "antd";
import { EyeFilled, CopyFilled } from "@ant-design/icons";
import styled from "styled-components";
import { Divider } from "antd";

const FavoriteRoot = styled(Card)`
  width: 100%;
`;

const FavoriteTitle = styled(Typography.Title)`
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const FavoriteInfo = styled.div`
  color: #666;
  font-size: 12px;
  margin: 8px 0 8px 0;
`;

const Author = styled.div`
  padding: 2px 4px;
  font-size: 12px;
  border-radius: 22px;
  color: #666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1 0 0;
  margin-bottom: 24px;
`;

const Component = ({ title, name, avatar, onGo, ...props }) => {
  return (
    <FavoriteRoot bodyStyle={{ padding: 32, textAlign: "center" }} {...props}>
      <FavoriteTitle level={5}>{title}</FavoriteTitle>
      <FavoriteInfo>
        浏览量 239
        <Divider type="vertical" />
        书签 1478
      </FavoriteInfo>
      <Author>
        <Avatar size={18} src={avatar} /> <span>{name}</span>
      </Author>
      <Button type="primary" ghost onClick={() => onGo && onGo()}>
        进入浏览
      </Button>
    </FavoriteRoot>
  );
};

export default Component;
