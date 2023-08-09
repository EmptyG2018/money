import React, { Fragment } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { FolderOutlined, RightOutlined, DownOutlined } from "@ant-design/icons";

const PathItemRoot = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 6px 16px 6px
    ${({ indentWidth, level }) => 6 + indentWidth * (level - 1) + "px"};
  color: #333;
  background-color: ${({ selected }) => (selected ? "#0351ff" : "none")};
  &:hover {
    background-color: rgb(0, 0, 0, 0.08);
    cursor: pointer;
  }
`;

const PathItemCell = styled.span`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  width: 0;
`;

const PathItemIcon = styled.span`
  margin-right: 4px;
`;

const PathItemName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PathItemPrefix = styled.span`
  margin-right: 4px;
`;

const PathItemExtend = styled.span`
  margin-left: 8px;
`;

/**
 * @title 单行路径
 * @param {React.ReactNode} [prefix] 前缀扩展
 * @param {React.ReactNode} [icon] 路径图标
 * @param {string} name 路径名
 * @param {number} level 层级
 * @param {boolean} [selected] 选中状态
 * @param {boolean} [disabled] 禁用状态
 * @param {number} indentWidth 缩进宽度
 * @param {React.ReactNode} [extend] 扩展
 * @param {Function} [onClick] 点击事件
 */
export const PathItem = ({
  prefix,
  icon,
  name,
  disabled,
  extend,
  onClick,
  ...rest
}) => {
  return (
    <PathItemRoot
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        !disabled && onClick && onClick(e);
      }}
      {...rest}
    >
      <PathItemCell>
        {prefix && <PathItemPrefix>{prefix}</PathItemPrefix>}
        {icon && <PathItemIcon>{icon}</PathItemIcon>}
        <PathItemName>{name}</PathItemName>
      </PathItemCell>
      {extend && <PathItemExtend>{extend}</PathItemExtend>}
    </PathItemRoot>
  );
};

const FolderCollpaseIcon = styled.div`
  line-height: 1;
`;

const FolderCollpaseIconSvg = styled.span`
  transition: transform 0.3s;
  transform: rotate(${({ expand }) => (expand ? "0deg" : "-90deg")});
`;

/**
 * @title 文件夹
 * @param {string} name 文件夹名称
 * @param {React.ReactNode} [icon] 文件夹图标
 * @param {boolean} expand 是否展开
 * @param {number} level 层级
 * @param {boolean} [selected] 选中状态
 * @param {boolean} [disabled] 禁用状态
 * @param {React.ReactNode} [children] 子级组件
 * @param {Function} [onClick] 点击事件
 */
const Folder = ({ expand, children, ...rest }) => {
  return (
    <>
      <PathItem
        indentWidth={10}
        prefix={
          <FolderCollpaseIcon>
            <FolderCollpaseIconSvg expand={expand} size={18} />
          </FolderCollpaseIcon>
        }
        {...rest}
      />
      {expand && children}
    </>
  );
};

/**
 * @title 文件
 * @param {string} name 文件名称
 * @param {React.ReactNode} [icon] 文件图标
 * @param {number} level 层级
 * @param {boolean} [selected] 选中状态
 * @param {boolean} [disabled] 禁用状态
 * @param {function} [onClick] 点击事件
 */
const File = ({ ...rest }) => {
  return <PathItem indentWidth={16} {...rest} />;
};

const PathRoot = styled.div`
  user-select: none;
`;

/**
 * @title 路径
 * @param {React.ReactNode} folderIcon 文件夹图标
 * @param {FileIcons} fileIcons 文件图标
 * @param {PathNode[]} items 路径数据
 * @param {PathNodeKey} selectedKey 选中文件主键
 * @param {PathNodeKey[]} openKeys 打开文件夹列表
 */
const Path = ({
  items,
  selectedKey,
  openKeys,
  disabled,
  titleRender,
  extendRender,
  onExpand,
  onSelect,
}) => {
  let render = null;

  const deepGenterRender = (items, level) => {
    const childrenRender = [];
    for (let i = 0, j = items.length; i < j; i++) {
      const disabledPath = !!disabled && disabled(items[i]);

      if (items[i].children) {
        const openFlag = openKeys.includes(items[i].id);
        childrenRender.push(
          <Folder
            name={
              titleRender ? titleRender(items[i], items[i].name) : items[i].name
            }
            prefix={
              <Button
                size="small"
                type="text"
                icon={openFlag ? <DownOutlined /> : <RightOutlined />}
              />
            }
            icon={<FolderOutlined style={{ fontSize: "18px" }} />}
            level={level}
            disabled={disabledPath}
            extend={extendRender(items[i])}
            expand={openFlag}
            onClick={() => {
              onExpand &&
                onExpand(
                  openFlag
                    ? openKeys.filter((item) => item !== items[i].id)
                    : [...openKeys, items[i].id],
                  items[i].id,
                  items[i]
                );
            }}
          >
            {deepGenterRender(items[i].children, level + 1)}
          </Folder>
        );
      } else {
        childrenRender.push(
          <File
            name={
              titleRender ? titleRender(items[i], items[i].name) : items[i].name
            }
            prefix={
              <Button
                style={{ visibility: "hidden" }}
                size="small"
                type="text"
                icon={<DownOutlined />}
              />
            }
            icon={<FolderOutlined style={{ fontSize: "18px" }} />}
            level={level}
            disabled={disabledPath}
            selected={selectedKey === items[i].id}
            extend={extendRender(items[i])}
            onClick={() => {
              onSelect && onSelect(items[i].id, items[i]);
            }}
          />
        );
      }
    }
    return childrenRender.map((item, index) => (
      <Fragment key={index}>{item}</Fragment>
    ));
  };

  render = deepGenterRender(items, 1);

  return <PathRoot>{render}</PathRoot>;
};

export default Path;
