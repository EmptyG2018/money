import { Card, Typography, Avatar, Button, Tag } from "antd";
import styled from "styled-components";

const TeamRoot = styled(Card)`
  width: 100%;
`;

const TeamTitle = styled(Typography.Title)`
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 16px 0;
`;

const TeamDesc = styled(Typography.Paragraph)`
  height: 44px;
  overflow: hidden;
`;

const TeamTag = styled.div`
  height: 22px;
  overflow: hidden;
  margin-bottom: 14px;
`;

const Component = ({ title, tags = [], thumb, name, desc, onGo, ...props }) => {
  return (
    <TeamRoot bodyStyle={{ padding: 32, textAlign: "center" }} {...props}>
      <Avatar size={48} src={thumb} />
      <TeamTitle level={5}>{title}</TeamTitle>
      <TeamDesc type="secondary">{desc}</TeamDesc>
      <TeamTag>
        {tags.slice(0, 3).map((item) => (
          <Tag bordered={false} key={item.id}>
            {item.tagName}
          </Tag>
        ))}
      </TeamTag>
      <Button type="primary" ghost onClick={() => onGo && onGo()}>
        进入浏览
      </Button>
    </TeamRoot>
  );
};

export default Component;
