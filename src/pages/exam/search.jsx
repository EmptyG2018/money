import { useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button, Card, List, Space } from "antd";
import { FileTextTwoTone } from "@ant-design/icons";
import { useRequest } from "ahooks";
import Container from "../../components/Container";
import styled, { css } from "styled-components";
import { RightOutline } from "antd-mobile-icons";

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
          actived={item.key === activeKey}
          onClick={(e) => {
            e.stopPropagation();
            onChange && onChange(item.key);
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

const Info = styled.div`
  margin-bottom: 24px;
  padding-inline: 12px;
`;

const RecrodCard = styled(Card)`
  border-radius: 0;
`;

const RecordTitle = styled(Link)`
  font-size: 16px;
  font-weight: 400;
`;

const Component = () => {
  const listRef = useRef();
  const [searchParams] = useSearchParams();
  const word = searchParams.get("keyword");
  const keyword = decodeURIComponent(word || "");

  const filter = [
    {
      key: "paper",
      label: "试卷",
      value: 99,
    },
    {
      key: "topic",
      label: "题目",
      value: 32,
    },
  ];

  const data = [
    {
      title: "2022年成人高等考试《语文》（高起本）模考试卷",
    },
    {
      title: "小升初语文章节练习2021",
    },
    {
      title: "2022年中考语文对联专项训练题（1）",
    },
    {
      title: "2020年成人高等考试《语文》（高起专）真题",
    },
    {
      title: "2022年成人高等考试《语文》（高起本）模考试卷",
    },
    {
      title: "小升初语文章节练习2021",
    },
    {
      title: "2022年中考语文对联专项训练题（1）",
    },
    {
      title: "2020年成人高等考试《语文》（高起专）真题",
    },
    {
      title: "2022年成人高等考试《语文》（高起本）模考试卷",
    },
    {
      title: "小升初语文章节练习2021",
    },
    {
      title: "2022年中考语文对联专项训练题（1）",
    },
    {
      title: "2020年成人高等考试《语文》（高起专）真题",
    },
  ];

  return (
    <Container title={false} gutter={[16, 24]}>
      <Info>以下关于 “{keyword}” 的搜索结果：</Info>
      <RecrodCard>
        <Filter
          items={filter}
          activeKey="topic"
          style={{ marginBottom: "16px" }}
        />
        <List
          itemLayout="horizontal"
          dataSource={data}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          renderItem={(item, index) => (
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
                  <FileTextTwoTone
                    style={{ marginTop: 8, marginLeft: 8, fontSize: 28 }}
                  />
                }
                title={
                  <RecordTitle href="https://ant.design">
                    {item.title}
                  </RecordTitle>
                }
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </RecrodCard>
    </Container>
  );
};

export default Component;
