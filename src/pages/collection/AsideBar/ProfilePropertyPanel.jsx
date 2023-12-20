import { forwardRef, useState, useRef, useMemo } from "react";
import {
  Dropdown,
  Space,
  Avatar,
  Button,
  Popover,
  Form,
  Input,
  message,
} from "antd";
import {
  CaretDownOutlined,
  CloudOutlined,
  InboxOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  Node,
  FavoriteBadge,
} from "../../../components/collection/FavoriteMenu";
import { useUser } from "../../../hooks/user";
import { useRequest } from "ahooks";
import { CreateGroup } from "../../../services/collection/category";
import styled from "styled-components";

const PROPERTYICONMAP = {
  "-1": <CloudOutlined style={{ fontSize: "18px" }} />,
  "-10": <InboxOutlined style={{ fontSize: "18px" }} />,
  "-99": <DeleteOutlined style={{ fontSize: "18px" }} />,
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
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgb(0, 0, 0, 0.08);
  }
`;

export const ProfilePanel = ({ extend, onLogouted }) => {
  const { user, logout } = useUser();

  return (
    <ProfilePanelRoot>
      <ProfileCell>
        <Dropdown
          trigger="click"
          arrow
          menu={{
            items: [{ key: "logout", label: "退出登录" }],
            onClick: ({ key }) => {
              if (key === "logout") {
                logout();
                onLogouted && onLogouted();
              }
            },
          }}
        >
          <ProfileUser>
            <Space>
              <Avatar size={20} src={user?.photoUrl} />
              <span>{user?.username}</span>
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

export const PropertyPanel = ({ activeKey, showAll = true, onSelect }) => {
  const { systemCollections } = useSelector(({ collection }) => collection);

  const propertys = useMemo(
    () =>
      systemCollections.slice(showAll ? 0 : 1, 3).map((item) => ({
        ...item,
        icon: PROPERTYICONMAP["" + item.id],
      })),
    [systemCollections, showAll]
  );

  return (
    <CategoryPanelRoot>
      {propertys.map((item) => (
        <Node
          selected={activeKey === item.id}
          key={item.id}
          level={1}
          indentWidth={10}
          prefix={
            <Button
              size="small"
              type="text"
              icon={<CaretDownOutlined />}
              style={{
                width: 18,
                height: 18,
                lineHeight: "18px",
                visibility: "hidden",
              }}
            />
          }
          icon={item.icon}
          name={
            <>
              {item.title}
              <FavoriteBadge>{item.count}</FavoriteBadge>
            </>
          }
          onClick={() =>
            onSelect && activeKey !== item.id && onSelect(item.id, item)
          }
        />
      ))}
    </CategoryPanelRoot>
  );
};

const CreateGroupFormPopover = forwardRef(
  ({ children, onCancel, onSubmit, ...props }, ref) => {
    return (
      <Popover
        title="创建群组"
        content={
          <Form
            ref={ref}
            layout="vertical"
            autoFocus
            initialValues={{ title: "" }}
            onFinish={(values) => {
              onSubmit && onSubmit(values);
            }}
          >
            <Form.Item
              name="title"
              rules={[{ required: true, message: "请输入群组名称" }]}
            >
              <Input placeholder="群组名称" style={{ width: 220 }} />
            </Form.Item>
            <Form.Item noStyle>
              <div align="right">
                <Space>
                  <Button
                    type="text"
                    size="small"
                    onClick={() => {
                      onCancel && onCancel();
                    }}
                  >
                    取消
                  </Button>
                  <Button type="primary" size="small" htmlType="submit">
                    确认
                  </Button>
                </Space>
              </div>
            </Form.Item>
          </Form>
        }
        {...props}
      >
        {children}
      </Popover>
    );
  }
);

export const CreateGroupBtn = ({ onCreated }) => {
  const formPopover = useRef();
  const [modalShow, setModalShow] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { runAsync: createGroup } = useRequest(CreateGroup, { manual: true });

  return (
    <>
      {contextHolder}
      <CreateGroupFormPopover
        ref={formPopover}
        open={modalShow}
        trigger="click"
        onCancel={() => setModalShow(false)}
        onSubmit={async ({ title }) => {
          try {
            await createGroup({ title });
            onCreated && onCreated();
          } catch (err) {
            messageApi.error(err.message);
          } finally {
            setModalShow(false);
            formPopover.current.resetFields();
          }
        }}
      >
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={() => setModalShow(true)}
        />
      </CreateGroupFormPopover>
    </>
  );
};
