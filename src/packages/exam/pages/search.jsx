import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Card, List, Space } from "antd";
import { FileTextTwoTone, ProfileTwoTone } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { GetExamPaperByKeyword } from "../../../services/exam/exampaper";
import { GetTopicQuery } from "../../../services/exam/topic";
import Container from "../../../components/Container";
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

const SearchPanel = styled.div`
  padding: 72px 236px;
`;

const RecrodCard = styled(Card)`
  border-radius: 0;
`;

const RecordTitle = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  > p {
    margin: 0;
    img {
      display: none;
    }
  }
`;

const RecordDesc = styled.span`
  font-size: 12px;
`;

const Component = () => {
  const keyword = useRef("");
  const [active, setActive] = useState("paper");
  const [pagination, setPagination] = useState([1, 10]);
  const { run: searchExamPaper, data: examPapers } = useRequest(
    GetExamPaperByKeyword,
    { manual: true }
  );
  const { run: searchTopic, data: topics } = useRequest(GetTopicQuery, {
    manual: true,
  });

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

  const submit = () => {
    const paylod = {
      title: keyword.current,
      pageNum: pagination[0],
      pageSize: pagination[1],
    };
    if (active === "paper") searchExamPaper(paylod);
    if (active === "topic") searchTopic(paylod);
  };

  const record = useMemo(() => {
    if (active === "paper") return examPapers;
    if (active === "topic") return topics;
  }, [active, examPapers, topics]);

  useEffect(() => submit(), [pagination, active]);

  return (
    <Container title={false} gutter={[0, 24]}>
      <SearchPanel>
        <Input.Search
          size="large"
          defaultValue={keyword.current}
          enterButton="搜索"
          placeholder="搜索试题内容"
          allowClear
          onChange={(e) => {
            keyword.current = e.target.value;
          }}
          onSearch={submit}
        />
      </SearchPanel>
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
                      <ProfileTwoTone
                        style={{ marginTop: 8, marginLeft: 8, fontSize: 28 }}
                      />
                    )}
                  </>
                }
                title={
                  <>
                    {active === "paper" && (
                      <RecordTitle>{item.name}</RecordTitle>
                    )}
                    {active === "topic" && (
                      <RecordTitle
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    )}
                  </>
                }
                description={
                  <>
                    {active === "paper" && (
                      <>
                        <RecordDesc>{item.typeName}</RecordDesc>
                      </>
                    )}
                    {active === "topic" && (
                      <>
                        <RecordDesc>{item.typename}题</RecordDesc>・
                        <RecordDesc>{item.score}分</RecordDesc>
                      </>
                    )}
                  </>
                }
              />
            </List.Item>
          )}
        />
      </RecrodCard>
    </Container>
  );
};

export default Component;
