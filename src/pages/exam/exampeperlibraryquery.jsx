import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Divider, List } from "antd";
import { BookFilled, SwapOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { GetSubjectByCourseId } from "../../services/exam/category";
import { GetTopicQuery } from "../../services/exam/topic";
import styled, { css } from "styled-components";
import Container from "../../components/Container";

const NoStyledCard = styled(Card)`
  border-radius: 0;
  &:not(.ant-card-bordered) {
    box-shadow: none;
  }
`;

const TopicRoot = styled(Card)`
  width: 100%;
  &:not(.ant-card-bordered) {
    box-shadow: none;
  }
`;

const TopicTitle = styled.div`
  font-size: 16px;
  margin-bottom: 24px;
  img {
    max-width: 100%;
  }
`;

const Topic = ({ item }) => {
  return (
    <TopicRoot bordered={false} bodyStyle={{ padding: "16px 0" }}>
      <TopicTitle dangerouslySetInnerHTML={{ __html: item.title }}></TopicTitle>
    </TopicRoot>
  );
};

const CollapsePanel = styled.div`
  display: flex;
  align-items: self-start;
`;

const CollapseCell = styled.div`
  margin-left: 16px;
`;

const CollapseHeader = styled.div`
  font-size: 20px;
  margin-bottom: 6px;
  color: #333;
`;

const ToggleBtn = styled.button`
  border: none;
  outline: none;
  background-color: #f1f1f1;
  line-height: 1;
  padding: 4px 8px;
  margin-left: 8px;
  border-radius: 4px;
  color: #333;
  &:hover {
    color: #1677ff;
  }
`;

const CollapseDesc = styled.div`
  color: #707070;
`;

const CollapseCardBox = styled.div`
  margin-top: 16px;
  border-top: 1px solid #eee;
  max-height: 360px;
  overflow-y: auto;
`;
const CollapseCardItem = styled.div`
  padding: 8px 12px;
  font-size: 15px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba(22, 119, 255, 0.08);
    color: #1677ff;
  }

  ${({ actived }) =>
    !!actived &&
    css`
      background-color: rgba(22, 119, 255, 0.08);
      color: #1677ff;
    `}
`;

const ActionCard = styled(NoStyledCard)`
  & .ant-card-grid {
    width: 25%;
    padding: 0;
    box-shadow: none;
  }
`;

const ActionGrid = styled(Link)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 20px 24px;
  width: 100%;
  color: #333;
  &:hover {
    background-color: #f7f8fa;
    color: #333;
  }
`;

const ActionIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const ActionTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  margin-bottom: 4px;
`;

const ActionDesc = styled.p`
  margin: 0;
  font-size: 13px;
  color: #8c8c8c;
`;

const TopicCard = styled(NoStyledCard)``;

const ACTIONS_LIST = [
  {
    key: 1,
    title: "顺序练习",
    desc: "依次排序练习",
    icon: "/imgs/exam/shunxu_icon.png",
  },
  {
    key: 2,
    title: "模拟考试",
    desc: "随机抽题仿真练习",
    icon: "/imgs/exam/moni_icon.png",
  },
  {
    key: 3,
    title: "随机练习",
    desc: "试题顺序打乱练习",
    icon: "/imgs/exam/suiji_icon.png",
  },
  {
    key: 4,
    title: "题型练习",
    desc: "按题型分类练习",
    icon: "/imgs/exam/tixing_icon.png",
  },
  {
    key: 5,
    title: "章节练习",
    desc: "按章节分类练习",
    icon: "/imgs/exam/zhangjie_icon.png",
  },
  {
    key: 6,
    title: "历年真题",
    desc: "往年真题/模拟题",
    icon: "/imgs/exam/zhengti_icon.png",
  },
  {
    key: 7,
    title: "高频错题",
    desc: "精选高评易错题",
    icon: "/imgs/exam/gaopin_icon.png",
  },
];

const Component = () => {
  const params = useParams();
  const [collpased, setCollpased] = useState(false);
  const [active, setActive] = useState("");

  const { data: subjects } = useRequest(GetSubjectByCourseId, {
    defaultParams: [{ pId: params.id }],
    onSuccess(res) {
      res?.length && setActive(res[0].id);
    },
  });

  const { run: getTopicQuery, data: topics } = useRequest(GetTopicQuery, {
    manual: true,
  });

  const subject = (subjects || []).find((item) => item.id === active);

  useEffect(() => {
    subject &&
      getTopicQuery({ subjectId: subject.id, pageNum: 1, pageSize: 9999 });
  }, [subject]);

  return (
    <Container title={false} gutter={[0, 24]}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <NoStyledCard bordered={false}>
          <CollapsePanel>
            <BookFilled style={{ color: "#1677ff", fontSize: "48px" }} />
            <CollapseCell>
              <CollapseHeader>
                <b>XXXXXXX</b>
                <Divider type="vertical" />
                {subject?.name}
                <ToggleBtn onClick={() => setCollpased(!collpased)}>
                  <SwapOutlined style={{ fontSize: "14px" }} /> 切换科目
                </ToggleBtn>
              </CollapseHeader>
              <CollapseDesc>章节介绍： 共有0个章节</CollapseDesc>
            </CollapseCell>
          </CollapsePanel>
          {collpased && (
            <CollapseCardBox>
              {(subjects || []).map((item) => (
                <CollapseCardItem
                  actived={item.id === active ? 1 : 0}
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    setCollpased(false);
                  }}
                >
                  {item.name}
                </CollapseCardItem>
              ))}
            </CollapseCardBox>
          )}
        </NoStyledCard>
        <ActionCard
          bordered={false}
          title="练习中心"
          bodyStyle={{ padding: 10 }}
        >
          {ACTIONS_LIST.map((item) => (
            <Card.Grid hoverable={false} key={item.key}>
              <ActionGrid>
                <ActionIcon src={item.icon}></ActionIcon>
                <div>
                  <ActionTitle>{item.title}</ActionTitle>
                  <ActionDesc>{item.desc}</ActionDesc>
                </div>
              </ActionGrid>
            </Card.Grid>
          ))}
        </ActionCard>
        <TopicCard title="题库预览">
          <List
            rowKey="id"
            dataSource={topics?.rows || []}
            renderItem={(item, index) => <Topic item={item} index={index} />}
          />
        </TopicCard>
      </div>
    </Container>
  );
};

export default Component;
