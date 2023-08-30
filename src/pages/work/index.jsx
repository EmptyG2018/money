import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Popover,
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
  CaretDownOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useContextMenu } from "react-contexify";

import BookmarkCard from "../../components/BookmarkCard";
import BookmarkCell from "../../components/BookmarkCell";

import { useGroup, useCreateGroup } from "../../hooks/group";
import { useAuth, useSyncInfo } from "../../hooks/user";

const CollectCountTag = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
`;

/**
 * @title 折叠单行
 * @param {string} [name] 名称
 * @param {boolean} [collapsed] 折叠
 * @param {React.ReactNode} [extend] 拓展
 * @param {React.ReactNode} [children] 子级组件
 */
const CollapseItemRoot = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  cursor: pointer;
`;

const CollapseItemTitle = styled.h2`
  margin: 0;
  padding: 0;
  color: grey;
  flex: 1 0 0;
  width: 0;
  font-size: 14px;
  font-weight: 400;
`;

const CollapseItem = ({ name, collapsed, extend, children, onClick }) => {
  return (
    <>
      <CollapseItemRoot
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick(e);
        }}
      >
        <CollapseItemTitle>{name}</CollapseItemTitle>
        {extend}
      </CollapseItemRoot>
      {!collapsed && children}
    </>
  );
};

/**
 * @title 用户控板
 * @param {string} [name] 名称
 * @param {string} [avatar] 头像
 * @param {React.ReactNode} [extend] 拓展
 * @param {function} [onLogout] 退出登录
 */
const ProfilePanelRoot = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`;

const ProfileCell = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  width: 0;
`;

const ProfileUser = styled.div`
  padding: 4px 8px;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background-color: rgb(0, 0, 0, 0.08);
  }
`;

const ProfilePanel = ({ name, avatar, extend, onLogout }) => {
  return (
    <ProfilePanelRoot>
      <ProfileCell>
        <Dropdown
          trigger="click"
          arrow
          menu={{
            items: [
              {
                key: "logout",
                label: "退出登录",
              },
            ],
            onClick: ({ key }) => {
              key === "logout" && onLogout();
            },
          }}
        >
          <ProfileUser>
            <Space>
              <Avatar size={20} src={avatar} />
              <span>{name}</span>
              <CaretDownOutlined style={{ fontSize: "12px" }} />
            </Space>
          </ProfileUser>
        </Dropdown>
      </ProfileCell>
      {extend}
    </ProfilePanelRoot>
  );
};

/**
 * @title 分类控板
 * @param {array} [items] 分类集合
 * @param {string|number} [selectedKey] 选中高亮
 * @param {function} [onClick] 点击事件
 */
const CategoryPanelRoot = styled.div`
  padding-bottom: 8px;
`;

const CategoryPanel = ({ items, onClick }) => {
  return (
    <CategoryPanelRoot>
      {items.map((item) => (
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
          onClick={() => onClick && onClick(item.id, item)}
        />
      ))}
    </CategoryPanelRoot>
  );
};

/**
 * @title 收藏集控板
 * @param {array} [items] 分类集合
 * @param {string|number} [selectedKey] 选中高亮
 * @param {function} [onClick] 点击事件
 */
const CollectPanelRoot = styled.div`
  padding-bottom: 8px;
`;

const CollectPanel = ({ items }) => {
  return (
    <CollectPanelRoot>
      {items.map((item) => (
        <>
          <CollapseItem
            name={item.title}
            collapsed={item.collapsed}
            extend={
              <Button size="small" type="text" icon={<EllipsisOutlined />} />
            }
          >
            {item.children && item.children.length && (
              <Path
                items={item.children}
                selectedKey={[]}
                openKeys={[]}
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
          </CollapseItem>
        </>
      ))}
    </CollectPanelRoot>
  );
};

const TeamPanel = () => {};

const ComponentRoot = styled(Layout)`
  height: 100vh;
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

const Component = () => {
  const { show } = useContextMenu({ id: "win" });

  const { groups } = useGroup();

  const { create } = useCreateGroup();

  const syncInfo = useSyncInfo();

  const authed = useAuth();

  const { info } = useSelector(({ user }) => user);

  const navigate = useNavigate();

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

  const selectedResource = null;

  const opendResources = ["1", "2", "_1", "_2"];

  const handleExpandChange = () => {};

  return (
    <ComponentRoot hasSider style={{ backgroundColor: "#fff" }}>
      <Layout.Sider width={290} style={{ backgroundColor: "#f6f5f4" }}>
        <ProfilePanel
          avatar={info?.photoUrl}
          name={info?.username}
          extend={
            <Popover
              title="新增收藏集"
              content={
                <Space direction="vertical">
                  <Input placeholder="收藏集名称" />
                  <div align="right">
                    <Space>
                      <Button type="text" size="small">
                        取消
                      </Button>
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                          create({ title: "demo" });
                        }}
                      >
                        确认
                      </Button>
                    </Space>
                  </div>
                </Space>
              }
            >
              <Button type="text" icon={<PlusOutlined />} />
            </Popover>
          }
          onLogout={() => {
            syncInfo.clear();
            navigate("/login", { replace: true });
          }}
        />
        <CategoryPanel items={categorys} />

        <CollectPanel items={groups} />
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
