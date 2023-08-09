import { useState } from "react";
import {
  Layout,
  Button,
  Space,
  Avatar,
  Input,
  Dropdown,
  Row,
  Col,
  Divider,
  Checkbox,
  Typography,
} from "antd";
import Path, { PathItem } from "../../components/Path";
import { styled } from "styled-components";
import {
  CloudOutlined,
  InboxOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  UnorderedListOutlined,
  ExportOutlined,
  PlusOutlined,
  StarFilled,
  HistoryOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useContextMenu } from "react-contexify";

import BookmarkCard from "../../components/BookmarkCard";
import BookmarkCell from "../../components/BookmarkCell";

const ComponentRoot = styled(Layout)`
  height: 100vh;
`;

const ProfilePanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  width: 0;
`;

const CollectHeaderRoot = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
`;

const CollectHeaderTitle = styled.h2`
  margin: 0;
  padding: 0;
  color: grey;
  flex: 1 0 0;
  width: 0;
  font-size: 14px;
  font-weight: 400;
`;

const CollectCountTag = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HeaderTop = styled.div`
  padding: 8px 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  height: 0;
`;

const MarkContent = styled.div`
  flex: 1 1 0;
  height: 0;
  overflow-y: auto;
`;

const MarkWrap = styled.div`
  padding: 8px 16px;
`;

const MarkHeader = styled(MarkWrap)`
  border-bottom: 1px solid #eee;
`;

const MarkFooter = styled(MarkWrap)`
  border-top: 1px solid #eee;
`;

const BookmarkCardGrid = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(min(50% - 32px, 254px), 1fr));
  grid-template-rows: 1fr;
  padding: 16px;
  padding-bottom: 0;
`;

const CollectHeader = ({ name, extend }) => {
  return (
    <CollectHeaderRoot>
      <CollectHeaderTitle>{name}</CollectHeaderTitle>
      {extend}
    </CollectHeaderRoot>
  );
};

const Component = () => {
  const { show } = useContextMenu({ id: "win" });

  const { info } = useSelector(({ user }) => user);

  const [categorys] = useState([
    {
      id: "0",
      name: "所有书签",
      icon: <CloudOutlined style={{ fontSize: "18px" }} />,
    },
    {
      id: "-1",
      name: "未分类",
      icon: <InboxOutlined style={{ fontSize: "18px" }} />,
    },
    {
      id: "-99",
      name: "废纸篓",
      icon: <DeleteOutlined style={{ fontSize: "18px" }} />,
    },
  ]);

  const [collects] = useState([
    {
      id: "1",
      name: "收藏集",
      collapsed: false,
      children: [
        {
          id: "2",
          name: "私有的",
          children: [
            {
              id: "3",
              name: "语文课",
            },
            {
              id: "4",
              name: "英语课",
            },
          ],
        },
        {
          id: "3",
          name: "公开的",
        },
      ],
    },
    {
      id: "_1",
      name: "典藏",
      collapsed: true,
      children: [
        {
          id: "_2",
          name: "人生的意义",
          children: [
            { id: "_3", name: "死亡" },
            { id: "_4", name: "成长" },
          ],
        },
      ],
    },
  ]);

  const selectedResource = null;

  const opendResources = ["1", "2", "_1", "_2"];

  const handleExpandChange = () => {};

  return (
    <ComponentRoot hasSider style={{ backgroundColor: "#fff" }}>
      <Layout.Sider
        collapsed
        collapsedWidth={290}
        style={{ backgroundColor: "#f6f5f4" }}
      >
        <ProfilePanel>
          <Profile>
            <Space>
              <Avatar
                size={20}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <span>qwer12345</span>
            </Space>
          </Profile>
          <Button type="text" icon={<PlusOutlined />} />
        </ProfilePanel>

        {categorys.map((item) => (
          <PathItem
            key={item.id}
            level={2}
            indentWidth={10}
            icon={item.icon}
            name={
              <>
                {item.name} <CollectCountTag>(0)</CollectCountTag>
              </>
            }
          />
        ))}

        {collects.map((collect) => (
          <>
            <CollectHeader
              name={collect.name}
              extend={
                <Button size="small" type="text" icon={<EllipsisOutlined />} />
              }
            />
            {!collect.collapsed && (
              <Path
                items={collect.children}
                selectedKey={selectedResource}
                openKeys={opendResources}
                titleRender={(item, dom) => (
                  <>
                    {dom} <CollectCountTag>(99)</CollectCountTag>
                  </>
                )}
                extendRender={(item) => (
                  <Button
                    size="small"
                    type="text"
                    icon={<EllipsisOutlined />}
                  />
                )}
              />
            )}
          </>
        ))}
      </Layout.Sider>
      <Layout.Content>
        <Content>
          <HeaderTop>
            <Row justify="space-between" align="middle">
              <Col>
                <Input.Search placeholder="搜索" />
              </Col>
              <Col>
                <Dropdown.Button
                  type="primary"
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: "上传档案",
                      },
                    ],
                  }}
                >
                  <StarFilled />
                  添加
                </Dropdown.Button>
              </Col>
            </Row>
          </HeaderTop>
          <Container>
            <MarkHeader>
              <Row justify="space-between" align="middle">
                <Col>
                  <Space>
                    <DeleteOutlined />
                    废纸篓
                  </Space>
                </Col>
                <Col>
                  <Space size={2}>
                    <Button type="link" icon={<HistoryOutlined />}>
                      按日期
                    </Button>
                    <Button type="text" icon={<UnorderedListOutlined />}>
                      按列表
                    </Button>
                    <Divider type="vertical" />
                    <Button type="text" icon={<ExportOutlined />}>
                      导出书签
                    </Button>
                  </Space>
                </Col>
              </Row>
            </MarkHeader>

            <MarkContent>
              <BookmarkCardGrid>
                {new Array(32).fill().map((item) => (
                  <BookmarkCard
                    thumb="https://rdl.ink/render/https%3A%2F%2Fwww.seoxiehui.cn%2Fportal.php?mode=fillmax&fill=solid&format=webp&width=254&ar=16:9&dpr=3"
                    title="瑞星云"
                    desc="搜图导航精选及整理国内外优秀的设计行业网站"
                    website="www.baidu.com"
                    date="2021年09月12日"
                  />
                ))}
              </BookmarkCardGrid>
            </MarkContent>

            <MarkFooter>
              <Row justify="space-between" align="middle">
                <Col>
                  <Space>
                    <Checkbox>全选</Checkbox>
                    <Typography.Text type="secondary">
                      已选中(0)
                    </Typography.Text>
                  </Space>
                </Col>
                <Col>
                  <Space size={2}>
                    <Button icon={<DeleteOutlined />}>删除</Button>
                  </Space>
                </Col>
              </Row>
            </MarkFooter>
          </Container>
        </Content>
      </Layout.Content>
    </ComponentRoot>
  );
};

export default Component;
