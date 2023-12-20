import { useEffect, useRef, cloneElement } from "react";
import { Button, Dropdown, Space, Checkbox } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Fragment } from "react";

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

const ActionPanelRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  z-index: 1;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.06);
`;

const ActionExtra = styled.div`
  display: flex;
  flex: 1 0 0;
  justify-content: flex-end;
  margin-inline-start: 16px;
`;

const ActionPanel = ({
  title,
  checkAll,
  indeterminate,
  edit,
  filter,
  onSelect,
}) => {
  const editable = edit?.editable || false;
  const onEdit = edit?.onEdit || false;
  const filters = filter?.items || {};
  const onChange = filter?.onChange || false;

  return (
    <ActionPanelRoot>
      <span>
        <Checkbox
          style={{ marginInlineEnd: 6 }}
          checked={checkAll}
          indeterminate={indeterminate}
          onChange={onSelect}
        />
        {title}
      </span>
      <ActionExtra>
        {editable ? (
          <Space size={8}>
            {(edit?.actions || []).map((item, index) => (
              <Fragment key={index}>{item}</Fragment>
            ))}
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => onEdit && onEdit(!editable)}
            />
          </Space>
        ) : (
          filters && (
            <Space size={4}>
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
                      onChange && onChange(field, e.key, e);
                    }}
                  >
                    {selectedRender(filters[field].items, filters[field].key)}
                  </Dropdown>
                </span>
              ))}
            </Space>
          )
        )}
      </ActionExtra>
    </ActionPanelRoot>
  );
};

const MarkDataViewRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  height: 0;
`;

const MarkDataViewContent = styled.div`
  flex: 1 0 0;
  height: 0;
  overflow-y: auto;
`;

export const MarkDataView = ({
  title,
  rowKey,
  items = [],
  selectedKeys = [],
  edit,
  filter,
  layoutRender,
  itemRender,
  footerRender,
  onSelect,
  onScrolled,
}) => {
  const el = useRef();

  const checkAll = items.length > 0 && items.length === selectedKeys.length;
  const indeterminate =
    selectedKeys.length > 0 && selectedKeys.length < items.length;

  useEffect(() => {
    // const handleScroll = () => {
    //   const scrollTop = el.current.scrollTop;
    //   const height = el.current.offsetHeight;
    //   const totalHeight = el.current.scrollHeight;
    //   const isBottom = scrollTop + height >= totalHeight;
    //   isBottom && onScrolled && onScrolled();
    // };

    // el.current.addEventListener("scroll", handleScroll);

    // return () => {
    //   el.current.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  return (
    <MarkDataViewRoot>
      <ActionPanel
        checkAll={checkAll}
        indeterminate={indeterminate}
        title={title}
        edit={edit}
        filter={filter}
        onSelect={onSelect}
      />
      <MarkDataViewContent ref={el}>
        {cloneElement(layoutRender, {
          children: items.map((item) => (
            <Fragment key={item[rowKey]}>
              {itemRender(
                item[rowKey],
                item,
                selectedKeys.includes(item[rowKey])
              )}
            </Fragment>
          )),
        })}
        {!!footerRender && footerRender(hasMore)}
      </MarkDataViewContent>
    </MarkDataViewRoot>
  );
};
