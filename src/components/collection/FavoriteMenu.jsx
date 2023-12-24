import React, { Fragment } from "react";
import styled from "styled-components";

const NodeRoot = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 6px 16px 6px
    ${({ indentWidth, level }) => 6 + indentWidth * (level - 1) + "px"};
  color: #333;
  background-color: ${({ selected }) =>
    selected ? "rgba(0, 0, 0, 0.06)" : "none"};
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
`;

const NodeCell = styled.span`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  width: 0;
`;

const NodeIcon = styled.span`
  margin-right: 2px;
`;

const NodeName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NodePrefix = styled.span`
  margin-right: 2px;
`;

const NodeExtend = styled.span`
  margin-left: 8px;
`;

/**
 * @title 节点
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
export const Node = ({
  prefix,
  icon,
  name,
  disabled,
  extend,
  onClick,
  ...rest
}) => {
  return (
    <NodeRoot
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        !disabled && onClick && onClick(e);
      }}
      {...rest}
    >
      <NodeCell>
        {prefix && <NodePrefix>{prefix}</NodePrefix>}
        {icon && <NodeIcon>{icon}</NodeIcon>}
        <NodeName>{name}</NodeName>
      </NodeCell>
      {extend && <NodeExtend>{extend}</NodeExtend>}
    </NodeRoot>
  );
};

export const FavoriteBadge = styled.span`
  display: inline-block;
  position: relative;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  background-color: #dfdfdf;
  border-radius: 99px;
  line-height: 1;
  padding: 2px 4px;
  margin-inline-start: 2px;
  transform: scale(0.9);
`;

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
export const FavoriteMenuSub = ({ expand, children, ...rest }) => {
  return (
    <>
      <Node
        indentWidth={16}
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
export const FavoriteMenuItem = ({ ...rest }) => {
  return <Node indentWidth={16} {...rest} />;
};

/**
 * @title 收藏集控板
 * @param {array} [items] 分类集合
 * @param {string|number} [selectedKey] 选中高亮
 * @param {function} [onClick] 点击事件
 */
export default ({
  fieldProps,
  items = [],
  openKeys = [],
  selectedKeys = [],
  menuItemRender,
}) => {
  const keyField = fieldProps?.key || "key";
  const childrenField = fieldProps?.children || "children";

  const deepGenterRender = (items) => {
    const childrenRender = [];
    for (let i = 0, j = items.length; i < j; i++) {
      if (items[i][childrenField] && items[i][childrenField].length) {
        childrenRender.push(
          <>
            {menuItemRender(
              false,
              items[i],
              selectedKeys.includes(items[i][keyField]),
              openKeys.includes(items[i][keyField])
            )}
            {openKeys.includes(items[i][keyField]) &&
              deepGenterRender(items[i][childrenField])}
          </>
        );
      } else {
        childrenRender.push(
          menuItemRender(
            true,
            items[i],
            selectedKeys.includes(items[i][keyField])
          )
        );
      }
    }
    return childrenRender.map((item, index) => (
      <Fragment key={index}>{item}</Fragment>
    ));
  };

  return deepGenterRender(items);
};
