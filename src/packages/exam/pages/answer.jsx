import { Fragment, useRef, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { Button, Card, Divider } from "antd";
import { HourglassOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { GetTopicByPaperId } from "../../../services/exam/topic";
import Container from "../../../components/Container";
import styled, { css } from "styled-components";
import Topic from "../../../components/exam/Topic";

const StopAnswerDialogRoot = styled.div`
  z-index: 10000000;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.86);
`;

const StopAnswerDialog = ({ visible, onClose }) => {
  return createPortal(
    <>
      {visible && (
        <StopAnswerDialogRoot>
          <HourglassOutlined style={{ fontSize: "68px", color: "#fff" }} />
          <p
            style={{ fontSize: "20px", color: "#fff", marginBlockEnd: "40px" }}
          >
            已暂停答卷
          </p>
          <Button
            type="primary"
            ghost
            onClick={() => onClose && onClose(!visible)}
          >
            继续答卷
          </Button>
        </StopAnswerDialogRoot>
      )}
    </>,
    document.querySelector("body")
  );
};

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
  position: relative;
  display: flex;
  gap: 24px;
`;

const Main = styled(NoStyledCard)`
  flex: 1 0 0;
  width: 0;
`;

const PaperHeader = styled(NoStyledCard)`
  text-align: center;
  border-bottom: 1px solid #ededed;
`;

const PaperTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 16px 0;
`;

const PaperDesc = styled.div``;

const PaperDescItem = styled.span`
  font-size: 15px;
  color: #777777;
  & > b {
    font-weight: 400;
    color: #333;
  }
`;

const TopicItem = styled.div`
  border-bottom: 1px solid #ededed;
`;

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
`;

const AsideCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 80px;
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
  &:hover {
    border-color: #1677ff;
  }
  ${({ color }) =>
    color === "active" &&
    css`
      background-color: #1677ff;
      color: #fff;
      border-color: #1677ff;
    `}
`;

const CountDownTitle = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 600;
  padding-bottom: 10px;
`;

const CountDown = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const CountDownProgress = styled.div`
  position: relative;
  flex: 1;
  flex-shrink: 0;
  overflow: hidden;
  height: 8px;
  background-color: #ddd;
  border-radius: 6px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ ratio = 0 }) => ratio}%;
    height: 100%;
    background-color: #1677ff;
  }
`;

const CountDownTimer = styled.span`
  font-size: 12px;
  display: inline-block;
  text-align: right;
  width: 80px;
  color: #1677ff;
`;

const Action = styled.div`
  display: flex;
  gap: 12px;
  .ant-btn {
    border-radius: 4px;
  }
`;

const Component = () => {
  const timer = useRef();
  const params = useParams();
  const [stopAnswer, setStopAnswer] = useState(false);
  const [endSecs, setEndSecs] = useState(7200);
  const [answer, setAnswer] = useState({});
  const { data: topicCategorys } = useRequest(
    () => GetTopicByPaperId({ paperId: params.id }),
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

  useEffect(() => {
    if (!stopAnswer && endSecs > 0)
      timer.current = setTimeout(() => {
        setEndSecs(endSecs - 1);
      }, 1000);
    return () => clearTimeout(timer.current);
  }, [stopAnswer, endSecs]);

  useEffect(() => {
    endSecs <= 0 && submit();
  }, [endSecs]);

  const data = useMemo(() => {
    return [];
  }, [answer]);

  const submit = () => {
    alert("提交啦");
  };

  return (
    <>
      <Container title={false} gutter={[0, 24]}>
        <Content>
          <Main bordered={false} bodyStyle={{ padding: 0 }}>
            <PaperHeader bordered={false} bodyStyle={{ padding: "36px 24px" }}>
              <PaperTitle>计算机高级等级考试 - 微软证书</PaperTitle>
              <PaperDesc>
                <PaperDescItem>
                  卷面总分：<b>34分</b>
                </PaperDescItem>
                <Divider type="vertical" />
                <PaperDescItem>
                  答题时间：<b>120分钟</b>
                </PaperDescItem>
                <Divider type="vertical" />
                <PaperDescItem>
                  试卷题量：<b>34题</b>
                </PaperDescItem>
              </PaperDesc>
            </PaperHeader>
            {topics.map((item, index) => (
              <TopicItem id={"topic_" + item.id} key={item.id}>
                {(item.typeId === SINGLE || item.typeId === BOOLEAN) && (
                  <Topic.Single
                    headerExtraLeft={
                      <b style={{ fontSize: "18px" }}>{index + 1}、</b>
                    }
                    title={item.title}
                    options={extractOptions(item)}
                    answer={item.objective}
                    analyze={item.answer}
                    selected={answer[item.id]?.userObjAnswer[0]}
                    key={item.id}
                    onChange={(result) => {
                      setAnswer({
                        ...answer,
                        [item.id]: {
                          userObjAnswer: [result],
                          userSubAnswer: "",
                          confirmed: !!result,
                        },
                      });
                    }}
                  />
                )}
                {item.typeId === MULTIPLE && (
                  <Topic.Multiple
                    headerExtraLeft={
                      <b style={{ fontSize: "18px" }}>{index + 1}、</b>
                    }
                    title={item.title}
                    options={extractOptions(item)}
                    answer={item.objective.split(",")}
                    analyze={item.answer}
                    selected={answer[item.id]?.userObjAnswer}
                    key={item.id}
                    onChange={(result) => {
                      setAnswer({
                        ...answer,
                        [item.id]: {
                          userObjAnswer: result,
                          userSubAnswer: "",
                          confirmed: !!result.length,
                        },
                      });
                    }}
                  />
                )}
                {item.typeId === INDEFINITE && (
                  <Topic.Indefinite
                    headerExtraLeft={
                      <b style={{ fontSize: "18px" }}>{index + 1}、</b>
                    }
                    title={item.title}
                    options={extractOptions(item)}
                    answer={item.objective.split(",")}
                    analyze={item.answer}
                    selected={answer[item.id]?.userObjAnswer}
                    key={item.id}
                    onChange={(result) => {
                      setAnswer({
                        ...answer,
                        [item.id]: {
                          userObjAnswer: result,
                          userSubAnswer: "",
                          confirmed: !!result.length,
                        },
                      });
                    }}
                  />
                )}
                {(item.typeId === LOGIC ||
                  item.typeId === ERROR ||
                  item.typeId === PRACTICE) && (
                  <Topic
                    headerExtraLeft={
                      <b style={{ fontSize: "18px" }}>{index + 1}、</b>
                    }
                    title={item.title}
                    content={answer[item.id]?.userSubAnswer}
                    answer={item.subjective}
                    analyze={item.answer}
                    key={item.id}
                    onChange={(result) => {
                      setAnswer({
                        ...answer,
                        [item.id]: {
                          userObjAnswer: [],
                          userSubAnswer: result,
                          confirmed: !!result.trim(),
                        },
                      });
                    }}
                  />
                )}
              </TopicItem>
            ))}
          </Main>
          <Aside>
            <AsideCard>
              <NoStyledCard
                title="答题卡"
                bordered={false}
                headStyle={{ padding: 12 }}
                bodyStyle={{ padding: "12px 0" }}
              >
                <AnswerCardOuter>
                  {(topicCategorys || []).map((item) => (
                    <Fragment key={item.typeId}>
                      <AnswerCardGroupTitle>
                        {item.typeName}题
                      </AnswerCardGroupTitle>
                      <AnswerCardGroupContent>
                        {item.sub.map((item) => (
                          <a href={"#topic_" + item.id} key={item.id}>
                            <AnswerTopicBtn
                              color={answer[item.id]?.confirmed ? "active" : ""}
                            >
                              {topics.findIndex(
                                (topic) => topic.id === item.id
                              ) + 1}
                            </AnswerTopicBtn>
                          </a>
                        ))}
                      </AnswerCardGroupContent>
                    </Fragment>
                  ))}
                </AnswerCardOuter>
              </NoStyledCard>
              <NoStyledCard
                bordered={false}
                bodyStyle={{ padding: "16px 12px" }}
              >
                <CountDownTitle>考试剩余时长</CountDownTitle>
                <CountDown>
                  <CountDownProgress ratio={(endSecs / 7200) * 100} />
                  <CountDownTimer>
                    剩余{Math.floor(endSecs / 60)}分钟
                  </CountDownTimer>
                </CountDown>
                <Action>
                  <Button
                    block
                    size="large"
                    onClick={() => setStopAnswer(true)}
                  >
                    暂停考试
                  </Button>
                  <Button block size="large" type="primary" onClick={submit}>
                    提交试卷
                  </Button>
                </Action>
              </NoStyledCard>
            </AsideCard>
          </Aside>
        </Content>
      </Container>
      <StopAnswerDialog visible={stopAnswer} onClose={setStopAnswer} />
    </>
  );
};

export default Component;
