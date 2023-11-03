import { List, Spin } from "antd";
import styled from "styled-components";

const BadgeRoot = styled.span`
  display: inline-block;
  background-color: #eee;
  color: #999;
  border-radius: 999px;
  font-size: 12px;
  padding-inline: 6px;

  ${({ actived }) =>
    actived &&
    css`
      color: #1677ff;
      background-color: #e6f7ff;
    `}
`;

const Badge = ({ count, actived }) => {
  return <BadgeRoot actived={actived}>{count}</BadgeRoot>;
};

const FilterRoot = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  user-select: none;
`;

const FilterItem = styled.div`
  color: rgba(51, 51, 51, 0.8);
  font-size: 18px;
  cursor: pointer;

  ${({ actived }) =>
    actived &&
    css`
      color: #333;
      font-weight: 600;
    `}
`;

const Filter = ({ activeKey, items, onChange, ...props }) => {
  return (
    <FilterRoot {...props}>
      {items.map((item) => (
        <FilterItem
          key={item.key}
          actived={item.key === activeKey ? 1 : 0}
          onClick={(e) => {
            e.stopPropagation();
            onChange && activeKey !== item.key && onChange(item.key);
          }}
        >
          <Space size={2}>
            {item.label}
            <Badge count={item.value} actived={item.key === activeKey} />
          </Space>
        </FilterItem>
      ))}
    </FilterRoot>
  );
};

const RecrodCard = styled(Card)`
  border-radius: 0;
`;

const Component = ({ rowKey, filter, pagination, request }) => {
  return (
    <RecrodCard>
      <Filter
        items={filter}
        activeKey={active}
        style={{ marginBottom: "16px" }}
        onChange={(key) => {
          setPagination([1, pagination[1]]);
          setActive(key);
        }}
      />
      <List
        rowKey={rowKey}
        itemLayout="horizontal"
        dataSource={[]}
        pagination={{
          onChange: (page, size) => setPagination([page, size]),
          current: pagination[0],
          pageSize: pagination[1],
          total: record?.total || 0,
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link">
                查看详情
                <RightOutline />
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <>
                  {active === "paper" && (
                    <FileTextTwoTone
                      style={{ marginTop: 8, marginLeft: 8, fontSize: 28 }}
                    />
                  )}
                  {active === "topic" && (
                    <AlignLeftOutlined
                      style={{ marginTop: 8, marginLeft: 8, fontSize: 28 }}
                    />
                  )}
                </>
              }
              title={
                <RecordTitle href="https://ant.design">{item.name}</RecordTitle>
              }
              description={<RecordDesc>类型</RecordDesc>}
            />
          </List.Item>
        )}
      />
    </RecrodCard>
  );
};

export default Component;
