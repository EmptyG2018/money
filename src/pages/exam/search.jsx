import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button, Card, List, Space } from "antd";
import { FileTextTwoTone, AlignLeftOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { GetExamPaperByKeyword } from "../../services/exam/exampaper";
import { GetTopicQuery } from "../../services/exam/topic";
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

const Info = styled.div`
  margin-bottom: 24px;
  padding-inline: 12px;
  font-size: 15px;
`;

const RecrodCard = styled(Card)`
  border-radius: 0;
`;

const RecordTitle = styled(Link)`
  font-size: 16px;
  font-weight: 400;
`;

const RecordDesc = styled.div`
  font-size: 12px;
`;

const Component = () => {
  const [searchParams] = useSearchParams();
  const word = searchParams.get("keyword");
  const mode = searchParams.get("mode");
  const [active, setActive] = useState(mode);
  const [pagination, setPagination] = useState([1, 10]);
  const { run: searchExamPaper, data: examPapers } = useRequest(
    GetExamPaperByKeyword,
    { manual: true }
  );
  const { run: searchTopic, data: topics } = useRequest(GetTopicQuery, {
    manual: true,
  });

  const keyword = decodeURIComponent(word || "");

  const filter = [
    {
      key: "paper",
      label: "试卷",
      value: examPapers?.total || 0,
    },
    {
      key: "topic",
      label: "题目",
      value: topics?.total || 0,
    },
  ];

  const record = useMemo(() => {
    if (active === "paper") return examPapers;
    if (active === "topic") return topics;
  }, [active, examPapers, topics]);

  useEffect(() => {
    setActive(mode === "topic" ? "topic" : "paper");
  }, [mode]);

  useEffect(() => {
    const paylod = {
      title: keyword,
      pageNum: pagination[0],
      pageSize: pagination[1],
    };
    if (active === "paper") searchExamPaper(paylod);
    if (active === "topic") searchTopic(paylod);
  }, [pagination, active, keyword]);

  return (
    <Container title={false} gutter={[0, 24]}>
      <Info>
        以下关于 “<b>{keyword}</b>” 的搜索结果：
      </Info>
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
          rowKey="id"
          itemLayout="horizontal"
          dataSource={record?.rows || []}
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
                  <RecordTitle href="https://ant.design">
                    {active === "paper" && item.name}
                    {active === "topic" && (
                      <span
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      ></span>
                    )}
                  </RecordTitle>
                }
                description={<RecordDesc>类型</RecordDesc>}
              />
            </List.Item>
          )}
        />
      </RecrodCard>
    </Container>
  );
};

export default Component;
