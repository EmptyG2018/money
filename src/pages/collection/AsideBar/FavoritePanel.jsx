import { useState, useMemo, useEffect, useRef, memo } from "react";
import { Dropdown, Button } from "antd";
import {
  ColumnHeightOutlined,
  VerticalAlignMiddleOutlined,
  DeleteOutlined,
  HighlightOutlined,
  PlusCircleOutlined,
  EllipsisOutlined,
  DownOutlined,
  RightOutlined,
  FolderOutlined,
  CaretDownOutlined,
  CaretRightOutlined
} from "@ant-design/icons";
import FavoriteMenu, {
  FavoriteMenuItem,
  FavoriteMenuSub,
  FavoriteBadge,
} from "../../../components/collection/FavoriteMenu";
import styled from "styled-components";
import { arrayToTree, findHierarchyById } from "../../../utils/helper";

const CONTEXTMENUOPTIONS = {
  DIVIDER: {
    type: "divider",
  },
  COLLAPSED: {
    key: "COLLAPSED",
    label: "展开收藏集",
    icon: <ColumnHeightOutlined />,
  },
  UNCOLLAPSED: {
    key: "UNCOLLAPSED",
    label: "拉起收藏集",
    icon: <VerticalAlignMiddleOutlined />,
  },
  DELETECOLLAPSE: {
    key: "DELETECOLLAPSE",
    label: "删除群组",
    icon: <DeleteOutlined />,
    danger: true,
  },
  RENAMECOLLAPSE: {
    key: "RENAMECOLLAPSE",
    label: "重命名群组",
    icon: <HighlightOutlined />,
  },
  CREATECOLLECTION: {
    key: "CREATECOLLECTION",
    label: "创建收藏集",
    icon: <PlusCircleOutlined />,
  },
  RENAMECOLLECTION: {
    key: "RENAMECOLLECTION",
    label: "重命名收藏集",
    icon: <HighlightOutlined />,
  },
  DELETECOLLECTION: {
    key: "DELETECOLLECTION",
    label: "删除收藏集",
    icon: <DeleteOutlined />,
    danger: true,
  },
};

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
  padding: 4px 16px 4px 20px;
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

export const CollapseItem = ({ name, extend, children, ...props }) => {
  return (
    <CollapseItemRoot {...props}>
      <CollapseItemTitle>{name}</CollapseItemTitle>
      {extend}
    </CollapseItemRoot>
  );
};

const FavoriteItem = memo(
  ({
    items = [],
    selectedKey,
    collapsed,
    collapseRender,
    conextMenu,
    onSelect,
  }) => {
    const contextMenuItems = conextMenu?.items || [];
    const contextMenuTrigger = conextMenu?.onClick || null;

    const initset = useRef(true);
    const [openKeys, setOpenKeys] = useState([]);

    const tree = useMemo(
      () =>
        arrayToTree({
          rowKey: "id",
          items,
          parentId: 0,
          level: 1,
        }),
      [items]
    );

    useEffect(() => {
      if (initset.current && !!selectedKey && tree.length) {
        setOpenKeys(
          findHierarchyById({ targetId: selectedKey, tree }).filter(
            (key) => key !== selectedKey
          )
        );
        initset.current = false;
      }
    }, [selectedKey, tree]);

    return (
      <>
        {collapseRender}
        {collapsed && (
          <div
            style={{
              backgroundColor: "rgba(250, 250, 250, .6)",
              boxShadow: "inset 0 0 1px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <FavoriteMenu
              openKeys={openKeys}
              selectedKeys={[selectedKey]}
              items={tree}
              fieldProps={{ key: "id" }}
              menuItemRender={(alone, item, selected, opend) => (
                <Dropdown
                  menu={{
                    items: contextMenuItems(item.id, item).map(
                      (item) => CONTEXTMENUOPTIONS[item]
                    ),
                    onClick: (e) =>
                      contextMenuTrigger &&
                      contextMenuTrigger(item.id, item, e.key),
                  }}
                  trigger={["contextMenu"]}
                >
                  {alone ? (
                    <FavoriteMenuItem
                      name={
                        <>
                          {item.title}
                          <FavoriteBadge>{item.count}</FavoriteBadge>
                        </>
                      }
                      prefix={
                        <Button
                          size="small"
                          type="text"
                          icon={<DownOutlined style={{ fontSize: 12 }} />}
                          style={{
                            width: 18,
                            height: 18,
                            lineHeight: "16px",
                            visibility: "hidden",
                          }}
                        />
                      }
                      icon={<FolderOutlined style={{ fontSize: "18px" }} />}
                      level={item.level}
                      selected={selected}
                      extend={
                        <span onClick={(e) => e.stopPropagation()}>
                          <Dropdown
                            menu={{
                              items: contextMenuItems(item.id, item).map(
                                (item) => CONTEXTMENUOPTIONS[item]
                              ),
                              onClick: (e) =>
                                contextMenuTrigger &&
                                contextMenuTrigger(item.id, item, e.key),
                            }}
                            trigger={["click"]}
                          >
                            <Button
                              size="small"
                              type="text"
                              icon={<EllipsisOutlined />}
                            />
                          </Dropdown>
                        </span>
                      }
                      onClick={() => {
                        onSelect && !selected && onSelect(item.id, item);
                      }}
                    />
                  ) : (
                    <FavoriteMenuSub
                      name={
                        <>
                          {item.title}
                          <FavoriteBadge>{item.count}</FavoriteBadge>
                        </>
                      }
                      prefix={
                        <Button
                          size="small"
                          type="text"
                          icon={
                            opend ? (
                              <DownOutlined style={{ fontSize: 12 }} />
                            ) : (
                              <RightOutlined style={{ fontSize: 12 }} />
                            )
                          }
                          style={{ width: 18, height: 18, lineHeight: "16px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenKeys(
                              opend
                                ? openKeys.filter((key) => key !== item.id)
                                : [...openKeys, item.id]
                            );
                          }}
                        />
                      }
                      icon={<FolderOutlined style={{ fontSize: "18px" }} />}
                      level={item.level}
                      selected={selected}
                      extend={
                        <span onClick={(e) => e.stopPropagation()}>
                          <Dropdown
                            menu={{
                              items: contextMenuItems(item.id, item).map(
                                (item) => CONTEXTMENUOPTIONS[item]
                              ),
                              onClick: (e) =>
                                contextMenuTrigger &&
                                contextMenuTrigger(item.id, item, e.key),
                            }}
                            trigger={["click"]}
                          >
                            <Button
                              size="small"
                              type="text"
                              icon={<EllipsisOutlined />}
                            />
                          </Dropdown>
                        </span>
                      }
                      onClick={() => {
                        onSelect && !selected && onSelect(item.id, item);
                      }}
                    />
                  )}
                </Dropdown>
              )}
            />
          </div>
        )}
      </>
    );
  }
);

export const FavoritePanel = ({
  selectedKey,
  collapsedKeys = [],
  collapses = [],
  collections = {},
  conextMenu,
  onCollapse,
  ...props
}) => {
  const contextMenuItems = conextMenu?.collapse?.items || [];
  const contextMenuTrigger = conextMenu?.collapse?.onClick || null;

  return collapses.map((item) => (
    <FavoriteItem
      collapsed={collapsedKeys.includes(item.id)}
      selectedKey={selectedKey}
      items={collections[item.id] || []}
      conextMenu={conextMenu?.collection}
      collapseRender={
        <Dropdown
          menu={{
            items: contextMenuItems(item.id, item).map(
              (item) => CONTEXTMENUOPTIONS[item]
            ),
            onClick: (e) =>
              contextMenuTrigger && contextMenuTrigger(item.id, item, e.key),
          }}
          trigger={["contextMenu"]}
        >
          <CollapseItem
            name={
              <>
                {item.title}
                {collapsedKeys.includes(item.id) ? (
                  <CaretDownOutlined style={{ fontSize: 13 }} />
                ) : (
                  <CaretRightOutlined style={{ fontSize: 13 }} />
                )}
              </>
            }
            extend={
              <span onClick={(e) => e.stopPropagation()}>
                <Dropdown
                  arrow
                  menu={{
                    items: contextMenuItems(item.id, item).map(
                      (item) => CONTEXTMENUOPTIONS[item]
                    ),
                    onClick: (e) =>
                      contextMenuTrigger &&
                      contextMenuTrigger(item.id, item, e.key),
                  }}
                  trigger={["click"]}
                >
                  <Button
                    size="small"
                    type="text"
                    icon={<EllipsisOutlined />}
                  />
                </Dropdown>
              </span>
            }
            onClick={() => {
              onCollapse &&
                onCollapse(!collapsedKeys.includes(item.id), item.id, item);
            }}
          />
        </Dropdown>
      }
      key={item.id}
      {...props}
    />
  ));
};
