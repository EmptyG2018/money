import { useState, useEffect, useMemo, useRef, Fragment } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FloatingPanel, NavBar, Switch, Button } from "antd-mobile";
import { LeftOutline, RightOutline } from "antd-mobile-icons";
import { useRequest } from "ahooks";
import { GetTopicByType } from "../../../services/exam/topic";
import styled, { css } from "styled-components";
import Page from "../../../components/community/mini/Page";
import Topic from "../../../components/exam/Topic";

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

const anchors = [148, window.innerHeight * 0.8];

const TopicView = styled.div`
  background-color: #fff;
  margin: 10px;
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

const SettingPanel = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
`;

const SettingItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #666;
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

const Component = () => {
  const floatingPanelRef = useRef();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(-1);
  const [autoNext, setAutoNext] = useState(false);
  const [god, setGod] = useState(false);
  const [answer, setAnswer] = useState({});
  const { data: topicCategorys } = useRequest(
    () =>
      GetTopicByType({
        Id: params.id,
        classType: params.mode,
        typeId: searchParams.get("topic_type"),
      }),
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

  return (
    <>
      <NavBar backArrow onBack={() => history.back()}>
        练习
      </NavBar>
      <Page background="#f5f5f5" yScroll>
        <TopicView>
          {currentTopic ? (
            <>
              {(currentTopic.typeId === SINGLE ||
                currentTopic.typeId === BOOLEAN) && (
                <Topic.Single
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
                  onConfirm={(result) => {
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
                  headerExtraLeft={
                    <b style={{ fontSize: "18px" }}>{index + 1}、</b>
                  }
                  title={currentTopic.title}
                  options={extractOptions(currentTopic)}
                  answer={currentTopic.objective.split(",")}
                  analyze={currentTopic.answer}
                  selected={answer[currentTopic.id]?.userObjAnswer}
                  showConfirmBtn
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
                  headerExtraLeft={
                    <b style={{ fontSize: "18px" }}>{index + 1}、</b>
                  }
                  title={currentTopic.title}
                  options={extractOptions(currentTopic)}
                  answer={currentTopic.objective.split(",")}
                  analyze={currentTopic.answer}
                  selected={answer[currentTopic.id]?.userObjAnswer}
                  showConfirmBtn
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
                  headerExtraLeft={
                    <b style={{ fontSize: "18px" }}>{index + 1}、</b>
                  }
                  title={currentTopic.title}
                  content={answer[currentTopic.id]?.userSubAnswer}
                  answer={currentTopic.subjective}
                  analyze={currentTopic.answer}
                  showConfirmBtn
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
            </>
          ) : (
            <div style={{ padding: 24 }}>
              <p>加载中...</p>
            </div>
          )}
        </TopicView>
      </Page>
      <FixedPanelPlaceholder>
        <FixedPanel>
          <SettingPanel>
            <SettingItem>
              <Switch
                checked={autoNext}
                style={{ "--width": "32px", "--height": "20px" }}
                onChange={setAutoNext}
              />
              答对自动下一题
            </SettingItem>
            <SettingItem>
              <Switch
                checked={god}
                style={{ "--width": "32px", "--height": "20px" }}
                onChange={setGod}
              />
              背题模式
            </SettingItem>
          </SettingPanel>
          <PageBtnGroup>
            <Button
              block
              size="large"
              disabled={isDisabledJumpNext(-1)}
              onClick={() => setIndex(index - 1)}
            >
              <LeftOutline /> 上一题
            </Button>
            <Button
              block
              size="large"
              disabled={isDisabledJumpNext(1)}
              onClick={() => setIndex(index + 1)}
            >
              下一题 <RightOutline />
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
                      floatingPanelRef.current?.setHeight(148);
                    }}
                  >
                    {order + 1}
                  </AnswerTopicBtn>
                ))}
              </AnswerTopicCard>
            </Fragment>
          ))}
        </FloatingPanelWrap>
      </FloatingPanel>
    </>
  );
};

export default Component;
