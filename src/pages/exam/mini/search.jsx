import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  NavBar,
  SearchBar,
  Card,
  List,
  Space,
  InfiniteScroll,
} from "antd-mobile";
import { FileOutline, RightOutline } from "antd-mobile-icons";
import { useRequest } from "ahooks";
import { GetExamPaperByKeyword } from "../../../services/exam/exampaper";
import { GetTopicQuery } from "../../../services/exam/topic";
import styled, { css } from "styled-components";
import Page from "../../../components/community/mini/Page";

const RecordItemRoot = styled(Link)`
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
  line-height: 1.2;
`;

const RecordItemCell = styled.div`
  flex: 1 0 0;
  width: 0;
  margin-inline: 8px;
`;

const RecordItemTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  * {
    display: inline;
  }
  p {
    margin: 0;
    padding: 0;
  }
  img {
    display: none;
  }
`;

const RecordItem = ({ icon, title, extra, ...props }) => {
  return (
    <RecordItemRoot {...props}>
      {icon}
      <RecordItemCell>
        <RecordItemTitle dangerouslySetInnerHTML={{ __html: title }} />
        {extra && <Space>{extra.map((item) => item)}</Space>}
      </RecordItemCell>
      <RightOutline style={{ fontSize: 18, color: "#969696" }} />
    </RecordItemRoot>
  );
};

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
  font-size: 16px;
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

const FilterPanel = styled.div`
  padding-inline: 16px;
  padding-block: 8px;
`;

const RecrodCard = styled(Card)`
  border-radius: 0;
`;

const RecordDesc = styled.span`
  font-size: 12px;
`;

const Component = () => {
  const keyword = useRef("");
  const scrollBar = useRef();
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
    <>
      <NavBar backArrow onBack={() => history.back()}>
        搜索
      </NavBar>
      <FilterPanel>
        <SearchBar
          defaultValue={keyword.current}
          placeholder="请输入内容"
          style={{ "--height": "36px", "--border-radius": "18px" }}
          onChange={(value) => {
            keyword.current = value;
          }}
          onSearch={submit}
        />
        <Filter
          items={filter}
          activeKey={active}
          style={{ marginTop: "16px" }}
          onChange={(key) => {
            setPagination([1, pagination[1]]);
            setActive(key);
          }}
        />
      </FilterPanel>
      <Page ref={scrollBar} yScroll>
        <RecrodCard>
          <List style={{ "--padding-left": 0 }}>
            {(record?.rows || []).map((item) => (
              <List.Item key={item.id}>
                {active === "paper" && (
                  <RecordItem
                    icon={
                      <FileOutline style={{ fontSize: 28, color: "#1677ff" }} />
                    }
                    title={item.name}
                    extra={[<RecordDesc>{item.typeName}</RecordDesc>]}
                  />
                )}
                {active === "topic" && (
                  <RecordItem
                    icon={
                      <FileOutline style={{ fontSize: 28, color: "#1677ff" }} />
                    }
                    title={item.title}
                    extra={[
                      <RecordDesc>{item.typename}题</RecordDesc>,
                      <RecordDesc>{item.score}分</RecordDesc>,
                    ]}
                  />
                )}
              </List.Item>
            ))}
          </List>
          {/* <InfiniteScroll hasMore /> */}
        </RecrodCard>
      </Page>
    </>
  );
};

export default Component;
