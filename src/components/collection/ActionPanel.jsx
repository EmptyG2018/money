import { Row, Col, Space, Button, Dropdown, Checkbox, Typography } from "antd";
import {
  HistoryOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  BarsOutlined,
  AppstoreOutlined,
  AlignLeftOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Fragment } from "react";

export const useAction = () => {
  return {
    filters: {
      sort: {
        key: "up",
        items: [
          {
            key: "up",
            icon: <HistoryOutlined />,
            label: "按最新",
          },
          {
            key: "timeBottom",
            icon: <HistoryOutlined />,
            label: "按最早",
          },
          {
            key: "nameUp",
            icon: <SortDescendingOutlined />,
            label: "按浏览量",
          },
        ],
      },
      view: {
        key: "list",
        items: [
          {
            key: "list",
            icon: <BarsOutlined />,
            label: "列表",
          },
          {
            key: "card",
            icon: <AppstoreOutlined />,
            label: "卡片",
          },
          {
            key: "title",
            icon: <AlignLeftOutlined />,
            label: "标题",
          },
        ],
      },
    },
  };
};

const ActionWrap = styled.div`
  padding: 8px 16px;
`;

const FilterWrap = styled(ActionWrap)`
  .selection_icon {
    display: none;
  }
  &:hover {
    .selection_icon {
      display: inline;
    }
  }
`;

const selectedRender = (items, key) => {
  const item = items.find((item) => item.key === key);
  return item ? (
    <Button type="text" icon={item.icon}>
      {item.label}
    </Button>
  ) : (
    <Button type="text">默认</Button>
  );
};

const FilterPanel = ({
  title,
  filters,
  checked,
  indeterminate,
  onSelectionChange,
  onFilterChange,
}) => {
  return (
    <FilterWrap>
      <Row justify="space-between" align="middle">
        <Col>
          <span className="selection_icon">
            <Checkbox
              checked={checked}
              indeterminate={indeterminate}
              onChange={onSelectionChange}
            />
            &nbsp;
          </span>
          {title}
        </Col>
        <Col>
          <Space size={2}>
            {Object.keys(filters).map((field) => (
              <span onClick={(e) => e.stopPropagation()}>
                <Dropdown
                  arrow
                  menu={{
                    items: filters[field].items,
                    selectable: true,
                    selectedKeys: [filters[field].key],
                  }}
                  trigger={["click"]}
                  onClick={(e) => {
                    onFilterChange && onFilterChange(field, e.key, e);
                  }}
                >
                  {selectedRender(filters[field].items, filters[field].key)}
                </Dropdown>
              </span>
            ))}
          </Space>
        </Col>
      </Row>
    </FilterWrap>
  );
};

const SelectionPanel = ({
  actions = [],
  checked,
  indeterminate,
  onSelectionChange,
  onClose,
}) => {
  return (
    <ActionWrap>
      <Row justify="space-between" align="middle">
        <Col>
          <Space>
            <Checkbox
              checked={checked}
              indeterminate={indeterminate}
              onChange={onSelectionChange}
            >
              全选
            </Checkbox>
            <Typography.Text type="secondary">已选中(0)</Typography.Text>
          </Space>
        </Col>
        <Col>
          <Space size={16}>
            {actions.map((item, index) => (
              <Fragment key={index}>{item}</Fragment>
            ))}
            <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
          </Space>
        </Col>
      </Row>
    </ActionWrap>
  );
};

const ActionPlaceholder = styled.div`
  position: relative;
  z-index: 1;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.06);
`;

export const ActionPanel = ({
  title,
  checked,
  indeterminate,
  isSelection,
  count = 0,
  actions = [],
  filters = {},
  onSelectionChange,
  onClose,
  onFilterChange,
  ...props
}) => {
  return (
    <ActionPlaceholder {...props}>
      {isSelection ? (
        <SelectionPanel
          title="已选中"
          count={count}
          actions={actions}
          checked={checked}
          indeterminate={indeterminate}
          onSelectionChange={onSelectionChange}
          onClose={onClose}
        />
      ) : (
        <FilterPanel
          title={title}
          filters={filters}
          checked={checked}
          indeterminate={indeterminate}
          onSelectionChange={onSelectionChange}
          onFilterChange={onFilterChange}
        />
      )}
    </ActionPlaceholder>
  );
};
