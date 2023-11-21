import { useState, useEffect, useMemo, useRef, Fragment } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { FloatingPanel, NavBar, Divider, Button } from "antd-mobile";
import { ClockCircleOutline } from "antd-mobile-icons";
import { useRequest } from "ahooks";
import { GetTopicByPaperId } from "../../../services/exam/topic";
import styled, { css } from "styled-components";
import Page from "../../../components/community/mini/Page";
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
          <ClockCircleOutline style={{ fontSize: "68px", color: "#fff" }} />
          <p
            style={{ fontSize: "20px", color: "#fff", marginBlockEnd: "40px" }}
          >
            已暂停答卷
          </p>
          <Button
            color="primary"
            fill="outline"
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

const anchors = [176, window.innerHeight * 0.8];

const AnswerView = styled.div`
  background-color: #fff;
  margin: 10px;
`;

const PaperHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid #ededed;
  padding: 16px;
`;

const PaperTitle = styled.h1`
  font-size: 18px;
  margin: 0 0 10px 0;
`;

const PaperDesc = styled.div``;

const PaperDescItem = styled.span`
  font-size: 12px;
  color: #777777;
  & > b {
    font-weight: 400;
    color: #333;
  }
`;

const TopicItem = styled.div`
  border-bottom: 1px solid #ededed;
`;

const FixedPanelPlaceholder = styled.div`
  height: 148px;
`;

const FixedPanel = styled.div`
  z-index: 1000;
  position: fixed;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  left: 0;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #eeeeee;
  gap: 16px;
`;

const CountDownPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;
`;

const CountDownTitle = styled.div`
  font-size: 16px;
  color: #333;
`;

const CountDown = styled.div`
  display: flex;
  align-items: center;
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
  font-size: 14px;
  display: inline-block;
  text-align: right;
  width: 100px;
  color: #1677ff;
`;

const PageBtnGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
`;

const FloatingPanelWrap = styled.div`
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  padding: 16px;
`;

const AnswerTopicTitle = styled.div`
  font-size: 15px;
  margin-block-end: 8px;
`;

const AnswerTopicCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-block-end: 16px;
`;

const AnswerTopicBtn = styled.button`
  outline: none;
  font-weight: 400;
  background-color: transparent;
  border: 1px solid #d9d9d9;
  user-select: none;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  height: 40px;
  border-radius: 6px;
  padding: 0;
  width: 46px;
  ${({ color }) =>
    color === "active" &&
    css`
      background-color: #1677ff;
      color: #fff;
      border-color: #1677ff;
    `}
`;

const Component = () => {
  const floatingPanelRef = useRef();
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
      <NavBar backArrow onBack={() => history.back()}>
        计算机高级等级考试 - 微软证书
      </NavBar>
      <Page background="#f5f5f5" yScroll>
        <AnswerView>
          <PaperHeader>
            <PaperTitle>计算机高级等级考试 - 微软证书</PaperTitle>
            <PaperDesc>
              <PaperDescItem>
                总分：<b>34分</b>
              </PaperDescItem>
              <Divider direction="vertical" style={{ margin: "0 4px" }} />
              <PaperDescItem>
                答题时间：<b>120分钟</b>
              </PaperDescItem>
              <Divider direction="vertical" style={{ margin: "0 4px" }} />
              <PaperDescItem>
                题量：<b>34题</b>
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
        </AnswerView>
      </Page>
      <FixedPanelPlaceholder>
        <FixedPanel>
          <CountDownPanel>
            <CountDownTitle>考试剩余时长</CountDownTitle>
            <CountDown>
              <CountDownProgress ratio={(endSecs / 7200) * 100} />
              <CountDownTimer>
                剩余{Math.floor(endSecs / 60)}分钟
              </CountDownTimer>
            </CountDown>
          </CountDownPanel>
          <PageBtnGroup>
            <Button block size="large" onClick={() => setStopAnswer(true)}>
              暂停考试
            </Button>
            <Button block size="large" color="primary" onClick={submit}>
              提交试卷
            </Button>
          </PageBtnGroup>
        </FixedPanel>
      </FixedPanelPlaceholder>
      <FloatingPanel ref={floatingPanelRef} anchors={anchors}>
        <FloatingPanelWrap>
          {(topicCategorys || []).map((item) => (
            <Fragment key={item.typeId}>
              <AnswerTopicTitle>{item.typeName}题</AnswerTopicTitle>
              <AnswerTopicCard>
                {item.sub.map((item) => (
                  <a href={"#topic_" + item.id} key={item.id}>
                    <AnswerTopicBtn
                      color={answer[item.id]?.confirmed ? "active" : ""}
                      onClick={() => {
                        floatingPanelRef.current?.setHeight(176);
                      }}
                    >
                      {topics.findIndex((topic) => topic.id === item.id) + 1}
                    </AnswerTopicBtn>
                  </a>
                ))}
              </AnswerTopicCard>
            </Fragment>
          ))}
        </FloatingPanelWrap>
      </FloatingPanel>
      <StopAnswerDialog visible={stopAnswer} onClose={setStopAnswer} />
    </>
  );
};

export default Component;
