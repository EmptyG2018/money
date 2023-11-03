import { Fragment, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Switch, Typography, Skeleton } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { GetTopicByChapterId } from "../../services/exam/topic";
import Container from "../../components/Container";
import styled, { css } from "styled-components";
import Topic from "../../components/exam/Topic";

const SINGLE = 1;
const MULTIPLE = 2;
const BOOLEAN = 3;
const INDEFINITE = 4;
const LOGIC = 5;
const ERROR = 6;
const PRACTICE = 7;

const extractOptions = (fields) => {
  const options = [];
  const OPTION_MAP = {
    a: "A",
    b: "B",
    c: "C",
    d: "D",
    e: "E",
    f: "F",
    g: "G",
  };
  for (let field in fields) {
    OPTION_MAP[field] &&
      fields[field] &&
      options.push({
        label: fields[field],
        value: OPTION_MAP[field],
      });
  }
  return options;
};

const NoStyledCard = styled(Card)`
  border-radius: 0;
  &:not(.ant-card-bordered) {
    box-shadow: none;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 24px;
`;

const Main = styled(NoStyledCard)`
  flex: 1 0 0;
  width: 0;
`;

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 280px;
`;

const AnswerAction = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 20px;
`;

const AnswerCardOuter = styled.div`
  padding: 12px;
  min-height: 80px;
  max-height: 240px;
  overflow-y: auto;
`;
const AnswerCardGroupTitle = styled.h3`
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 12px;
`;
const AnswerCardGroupContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const AnswerTopicBtn = styled.button`
  outline: none;
  font-weight: 400;
  background-color: transparent;
  border: 1px solid #d9d9d9;
  user-select: none;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  height: 32px;
  border-radius: 6px;
  padding: 0;
  width: 36px;
  ${({ color }) =>
    color === "error" &&
    css`
      background-color: #ff4d4f;
      color: #fff;
      border-color: #ff4d4f;
    `}
  ${({ color }) =>
    color === "success" &&
    css`
      background-color: #52c41a;
      color: #fff;
      border-color: #52c41a;
    `}
    ${({ color }) =>
    color === "active" &&
    css`
      background-color: #1677ff;
      color: #fff;
      border-color: #1677ff;
    `}
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
`;

const Component = () => {
  const params = useParams();
  const [index, setIndex] = useState(-1);
  const [autoNext, setAutoNext] = useState(false);
  const [god, setGod] = useState(false);
  const [answer, setAnswer] = useState({});
  const { data: topicCategorys } = useRequest(
    () => GetTopicByChapterId({ chapterId: params.id }),
    { refreshDeps: [params] }
  );

  const topics = useMemo(
    () =>
      (topicCategorys || []).reduce(
        (pre, current) => [...pre, ...current.sub],
        []
      ),
    [topicCategorys]
  );

  const isDisabledJumpNext = (step) =>
    0 > index + step || index + step > topics.length - 1;

  const currentTopic = topics[index];

  useEffect(() => {
    topics.length && setIndex(0);
  }, [topics]);

  const data = useMemo(() => {
    const list = Object.keys(answer).map((item) => ({
      id: +item,
      objAnswer: answer[item].userObjAnswer.join(","),
      subAnswer: answer[item].userSubAnswer,
      score: answer[item].userScore,
    }));
    const total = list.reduce((pre, current) => {
      return current.score + pre;
    }, 0);

    return { list, total };
  }, [answer]);

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  return (
    <Container title={false} gutter={[0, 24]}>
      <Content>
        <Main bordered={false}>
          {currentTopic ? (
            <>
              {(currentTopic.typeId === SINGLE ||
                currentTopic.typeId === BOOLEAN) && (
                <Topic.Single
                  bordered={false}
                  bodyStyle={{ padding: 0 }}
                  headerExtraLeft={
                    <b style={{ fontSize: "18px" }}>{index + 1}、</b>
                  }
                  title={currentTopic.title}
                  options={extractOptions(currentTopic)}
                  answer={currentTopic.objective}
                  analyze={currentTopic.answer}
                  selected={answer[currentTopic.id]?.userObjAnswer[0]}
                  showResult={answer[currentTopic.id]?.confirmed}
                  showAnswer={god}
                  key={currentTopic.id}
                  onChange={(result) => {
                    const success = currentTopic.objective === result;
                    success &&
                      autoNext &&
                      !isDisabledJumpNext(1) &&
                      setIndex(index + 1);
                    setAnswer({
                      ...answer,
                      [currentTopic.id]: {
                        userObjAnswer: [result],
                        userSubAnswer: "",
                        userScore: success ? currentTopic.score : 0,
                        confirmed: true,
                      },
                    });
                  }}
                />
              )}
              {currentTopic.typeId === MULTIPLE && (
                <Topic.Multiple
                  bordered={false}
                  bodyStyle={{ padding: 0 }}
                  headerExtraLeft={
                    <b style={{ fontSize: "18px" }}>{index + 1}、</b>
                  }
                  title={currentTopic.title}
                  options={extractOptions(currentTopic)}
                  answer={currentTopic.objective.split(",")}
                  analyze={currentTopic.answer}
                  selected={answer[currentTopic.id]?.userObjAnswer}
                  showResult={answer[currentTopic.id]?.confirmed}
                  showAnswer={god}
                  key={currentTopic.id}
                  onConfirm={(result) => {
                    const objective = currentTopic.objective.split(",");
                    let successLen = 0;
                    for (let i = 0, j = result.length; i < j; i++) {
                      if (objective.includes(result[i])) successLen += 1;
                    }
                    const success =
                      objective.length === successLen &&
                      successLen === result.length;
                    success &&
                      autoNext &&
                      !isDisabledJumpNext(1) &&
                      setIndex(index + 1);
                    setAnswer({
                      ...answer,
                      [currentTopic.id]: {
                        userObjAnswer: result,
                        userSubAnswer: "",
                        userScore: success ? currentTopic.score : 0,
                        confirmed: true,
                      },
                    });
                  }}
                />
              )}
              {currentTopic.typeId === INDEFINITE && (
                <Topic.Indefinite
                  bordered={false}
                  bodyStyle={{ padding: 0 }}
                  headerExtraLeft={
                    <b style={{ fontSize: "18px" }}>{index + 1}、</b>
                  }
                  title={currentTopic.title}
                  options={extractOptions(currentTopic)}
                  answer={currentTopic.objective.split(",")}
                  analyze={currentTopic.answer}
                  selected={answer[currentTopic.id]?.userObjAnswer}
                  showResult={answer[currentTopic.id]?.confirmed}
                  showAnswer={god}
                  key={currentTopic.id}
                  onConfirm={(result) => {
                    const objective = currentTopic.objective.split(",");
                    let successLen = 0;
                    for (let i = 0, j = result.length; i < j; i++) {
                      if (objective.includes(result[i])) successLen += 1;
                    }
                    const success =
                      objective.length === successLen &&
                      successLen === result.length;
                    success &&
                      autoNext &&
                      !isDisabledJumpNext(1) &&
                      setIndex(index + 1);
                    setAnswer({
                      ...answer,
                      [currentTopic.id]: {
                        userObjAnswer: result,
                        userSubAnswer: "",
                        userScore: success
                          ? currentTopic.score
                          : Math.floor(
                              (currentTopic.score / objective.length) *
                                successLen
                            ),
                        confirmed: true,
                      },
                    });
                  }}
                />
              )}
              {(currentTopic.typeId === LOGIC ||
                currentTopic.typeId === ERROR ||
                currentTopic.typeId === PRACTICE) && (
                <Topic
                  bordered={false}
                  bodyStyle={{ padding: 0 }}
                  headerExtraLeft={
                    <b style={{ fontSize: "18px" }}>{index + 1}、</b>
                  }
                  title={currentTopic.title}
                  content={answer[currentTopic.id]?.userSubAnswer}
                  answer={currentTopic.subjective}
                  analyze={currentTopic.answer}
                  showResult={answer[currentTopic.id]?.confirmed}
                  showAnswer={god}
                  key={currentTopic.id}
                  onConfirm={(result) => {
                    autoNext && !isDisabledJumpNext(1) && setIndex(index + 1);
                    setAnswer({
                      ...answer,
                      [currentTopic.id]: {
                        userObjAnswer: [],
                        userSubAnswer: result,
                        userScore: currentTopic.score,
                        confirmed: true,
                      },
                    });
                  }}
                />
              )}
              <AnswerAction>
                <Button
                  size="large"
                  disabled={isDisabledJumpNext(-1)}
                  onClick={() => setIndex(index - 1)}
                >
                  <LeftOutlined />
                  上一题
                </Button>
                <Button
                  size="large"
                  disabled={isDisabledJumpNext(1)}
                  onClick={() => setIndex(index + 1)}
                >
                  下一题
                  <RightOutlined />
                </Button>
              </AnswerAction>
            </>
          ) : (
            <Skeleton />
          )}
        </Main>
        <Aside>
          <NoStyledCard
            title="答题卡"
            extra={
              <Typography.Link onClick={() => setAnswer({})}>
                清空答题记录
              </Typography.Link>
            }
            bordered={false}
            headStyle={{ padding: 12 }}
            bodyStyle={{ padding: "12px 0" }}
          >
            <AnswerCardOuter>
              {(topicCategorys || []).map((item) => (
                <Fragment key={item.typeId}>
                  <AnswerCardGroupTitle>{item.typeName}题</AnswerCardGroupTitle>
                  <AnswerCardGroupContent>
                    {item.sub.map((item, order) => (
                      <AnswerTopicBtn
                        color={
                          currentTopic?.id === item.id
                            ? "active"
                            : answer[item.id]?.confirmed
                            ? answer[item.id]?.userScore === item.score
                              ? "success"
                              : "error"
                            : ""
                        }
                        key={item.id}
                        onClick={() => {
                          setIndex(
                            topics.findIndex((topic) => topic.id === item.id)
                          );
                        }}
                      >
                        {order + 1}
                      </AnswerTopicBtn>
                    ))}
                  </AnswerCardGroupContent>
                </Fragment>
              ))}
            </AnswerCardOuter>
          </NoStyledCard>
          <NoStyledCard
            title="设置"
            headStyle={{ padding: 12 }}
            bodyStyle={{ padding: 12 }}
          >
            <SettingItem>
              答对自动下一题
              <Switch checked={autoNext} onChange={setAutoNext} />
            </SettingItem>
            <SettingItem>
              背题模式
              <Switch checked={god} onChange={setGod} />
            </SettingItem>
          </NoStyledCard>
        </Aside>
      </Content>
    </Container>
  );
};

export default Component;
