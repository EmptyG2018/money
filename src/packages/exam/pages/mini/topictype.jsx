import { useParams, Link } from "react-router-dom";
import { Card } from "antd";
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  CheckOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { GetTopicTypeBySubjectId } from "../../../../services/exam/topic";
import styled from "styled-components";
import { Container } from "../../../../components/Container";
import {NavBar} from "antd-mobile";
import Page from "../../../../components/community/mini/Page";
import {useRef} from "react";
import {GetSubjectByCourseId} from "../../../../services/exam/category";

const ActionDiyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  background-color: ${({ color }) => color};
  border-radius: 12px;
  font-size: 20px;
  color: #fff;
`;

const NoStyledCard = styled(Card)`
  border-radius: 0;
  &:not(.ant-card-bordered) {
    box-shadow: none;
  }
`;

const ActionCard = styled(NoStyledCard)`
  & .ant-card-grid {
    width: 50%;
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

const Component = () => {
  const params = useParams();
  const scrollBar = useRef();
  const { data: topicTypes } = useRequest(GetTopicTypeBySubjectId, {
    defaultParams: [{ subjectId: params.id }],
  });
  const { data: subject } = useRequest(GetSubjectByCourseId, {
    defaultParams: [{ pId: params.id }],
  });
  const TOPIC_MAP = {
    1: ({ count, key }) => (
      <Card.Grid hoverable={false} key={key}>
        <ActionGrid to={`/m/exam/exercise/tmlxkm/${params.id}?topic_type=1`}>
          <ActionDiyIcon color="#5d8bff">
            <CheckCircleOutlined />
          </ActionDiyIcon>
          <div>
            <ActionTitle>单选题</ActionTitle>
            <ActionDesc>{count}道</ActionDesc>
          </div>
        </ActionGrid>
      </Card.Grid>
    ),
    2: ({ count, key }) => (
      <Card.Grid hoverable={false} key={key}>
        <ActionGrid to={`/m/exam/exercise/tmlxkm/${params.id}?topic_type=2`}>
          <ActionDiyIcon color="#ff935d">
            <CheckSquareOutlined />
          </ActionDiyIcon>
          <div>
            <ActionTitle>多选题</ActionTitle>
            <ActionDesc>{count}道</ActionDesc>
          </div>
        </ActionGrid>
      </Card.Grid>
    ),
    3: ({ count, key }) => (
      <Card.Grid hoverable={false} key={key}>
        <ActionGrid to={`/m/exam/exercise/tmlxkm/${params.id}?topic_type=3`}>
          <ActionDiyIcon color="#ad8efb">
            <CheckOutlined />
          </ActionDiyIcon>
          <div>
            <ActionTitle>判断题</ActionTitle>
            <ActionDesc>{count}道</ActionDesc>
          </div>
        </ActionGrid>
      </Card.Grid>
    ),
    4: ({ count, key }) => (
      <Card.Grid hoverable={false} key={key}>
        <ActionGrid to={`/m/exam/exercise/tmlxkm/${params.id}?topic_type=4`}>
          <ActionDiyIcon color="#ff5d83">
            <CheckSquareOutlined />
          </ActionDiyIcon>
          <div>
            <ActionTitle>不定项题</ActionTitle>
            <ActionDesc>{count}道</ActionDesc>
          </div>
        </ActionGrid>
      </Card.Grid>
    ),
    5: ({ count, key }) => (
      <Card.Grid hoverable={false} key={key}>
        <ActionGrid to={`/m/exam/exercise/tmlxkm/${params.id}?topic_type=5`}>
          <ActionDiyIcon color="#3b2bec">
            <BulbOutlined />
          </ActionDiyIcon>
          <div>
            <ActionTitle>简答题</ActionTitle>
            <ActionDesc>{count}道</ActionDesc>
          </div>
        </ActionGrid>
      </Card.Grid>
    ),
    6: ({ count, key }) => (
      <Card.Grid hoverable={false} key={key}>
        <ActionGrid to={`/m/exam/exercise/tmlxkm/${params.id}?topic_type=6`}>
          <ActionDiyIcon color="#ff4444">
            <BulbOutlined />
          </ActionDiyIcon>
          <div>
            <ActionTitle>异常题</ActionTitle>
            <ActionDesc>{count}道</ActionDesc>
          </div>
        </ActionGrid>
      </Card.Grid>
    ),
    7: ({ count, key }) => (
      <Card.Grid hoverable={false} key={key}>
        <ActionGrid to={`/m/exam/exercise/tmlxkm/${params.id}?topic_type=7`}>
          <ActionDiyIcon color="#fe2e69">
            <BulbOutlined />
          </ActionDiyIcon>
          <div>
            <ActionTitle>实践题</ActionTitle>
            <ActionDesc>{count}道</ActionDesc>
          </div>
        </ActionGrid>
      </Card.Grid>
    ),
  };

  return (
      <>

        <NavBar backArrow onBack={() => history.back()}>
          {subject?.courseName}
        </NavBar>
      <Page ref={scrollBar} background="#f5f5f5">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <ActionCard
              bordered={false}
              title="题目类型"
              bodyStyle={{ padding: 10 }}
            >
              {(topicTypes || []).map(
                (item) =>
                  TOPIC_MAP[item.questionTypeId] &&
                  TOPIC_MAP[item.questionTypeId]({ count: item.count })
              )}
            </ActionCard>
          </div>
      </Page>
      </>
  );
};

export default Component;
