import { useState, useCallback } from "react";
import { Input, Button, Card } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import styled, { css } from "styled-components";

const ResultRoot = styled.div`
  padding: 16px;
  border: 1px dashed #1677ff;
  background-color: rgba(22, 119, 255, 0.06);
  font-size: 15px;
`;

const ResultItem = styled.div`
  margin-block: 8px;
`;

const ResultLabel = styled.span`
  color: #1677ff;
`;

export const Result = ({ result, analyze, ...props }) => {
  return (
    <ResultRoot {...props}>
      <ResultItem>
        <ResultLabel>正确答案：</ResultLabel>
        <div dangerouslySetInnerHTML={{ __html: result }}></div>
      </ResultItem>
      <ResultItem>
        <ResultLabel>本题解析：</ResultLabel>
        <div dangerouslySetInnerHTML={{ __html: analyze }}></div>
      </ResultItem>
    </ResultRoot>
  );
};

const TopicCard = styled(Card)`
  border-radius: 0;
  &:not(.ant-card-bordered) {
    box-shadow: none;
  }
`;

const TopicHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-block-end: 24px;
`;
const TopicTitle = styled.div`
  flex: 1 0 0;
  width: 0;
  font-size: 18px;
  font-weight: 400;
  color: #333;
  > p {
    margin: 0;
    img {
      max-width: 100%;
    }
  }
`;

const TopicOptionGroup = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 16px;
`;

const TopicOption = styled.li`
  display: flex;
  align-items: flex-start;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 15px;
  border-color: transparent;
  cursor: pointer;

  ${({ status }) =>
    status === "active" &&
    css`
      color: #1677ff;
      background-color: #e6f4ff;
      border-color: #91caff !important;
    `}
  ${({ status }) =>
    status === "success" &&
    css`
      color: #52c41a;
      background-color: #f6ffed;
      border-color: #b7eb8f !important;
    `}
  ${({ status }) =>
    status === "solid" &&
    css`
      color: #52c41a;
      border-style: dashed;
      background-color: #fff;
      border-color: #b7eb8f !important;
    `}
  ${({ status }) =>
    status === "error" &&
    css`
      color: #ff4d4f;
      background-color: #fff2f0;
      border-color: #ffccc7 !important;
    `}
`;
const TopicOptionWord = styled.div`
  flex: 1 0 0;
  width: 0;
  > p {
    margin: 0;
    img {
      max-width: 100%;
    }
  }
`;

const TopicTextArea = styled(Input.TextArea)`
  margin-bottom: 16px;
`;

const EmitConfirmBtn = styled(Button)`
  border-color: #1677ff;
  color: #1677ff;
`;

// 单选题
const SingleTopic = ({
  headerExtraLeft,
  title,
  options,
  selected,
  answer,
  analyze,
  showResult,
  showAnswer,
  onChange,
  ...props
}) => {
  const readOnly = showAnswer || showResult;

  const getStatus = useCallback(
    (value) => {
      if (showAnswer) return value === answer ? "success" : "";

      if (showResult)
        return answer === value ? "success" : value === selected ? "error" : "";

      return value === selected ? "active" : "";
    },
    [showAnswer, showResult, answer, selected]
  );

  return (
    <TopicCard {...props}>
      <TopicHeader>
        {headerExtraLeft}
        <TopicTitle dangerouslySetInnerHTML={{ __html: title }} />
      </TopicHeader>
      <TopicOptionGroup>
        {options.map((item) => (
          <TopicOption
            status={getStatus(item.value)}
            key={item.value}
            onClick={(e) => {
              e.stopPropagation();
              onChange && !readOnly && onChange(item.value);
            }}
          >
            <b>{item.value}、</b>
            <TopicOptionWord dangerouslySetInnerHTML={{ __html: item.label }} />
          </TopicOption>
        ))}
      </TopicOptionGroup>
      {readOnly && (
        <Result style={{ marginTop: 16 }} result={answer} analyze={analyze} />
      )}
    </TopicCard>
  );
};

// 多选题
const MultipleTopic = ({
  headerExtraLeft,
  title,
  answer = [],
  options,
  showResult,
  showAnswer,
  selected = [],
  analyze,
  onConfirm,
  ...props
}) => {
  const [cacheSelected, setCacheSelected] = useState(selected);

  const readOnly = showAnswer || showResult;

  const getStatus = useCallback(
    (value) => {
      if (showAnswer) return answer.includes(value) ? "success" : "";

      if (showResult)
        return answer.includes(value)
          ? cacheSelected.includes(value)
            ? "success"
            : "solid"
          : cacheSelected.includes(value)
          ? "error"
          : "";

      return cacheSelected.includes(value) ? "active" : "";
    },
    [showAnswer, showResult, answer, cacheSelected]
  );

  return (
    <TopicCard {...props}>
      <TopicHeader>
        {headerExtraLeft}
        <TopicTitle dangerouslySetInnerHTML={{ __html: title }} />
      </TopicHeader>
      <TopicOptionGroup>
        {options.map((item) => (
          <TopicOption
            status={getStatus(item.value)}
            key={item.value}
            onClick={(e) => {
              e.stopPropagation();
              !readOnly &&
                setCacheSelected(
                  cacheSelected.includes(item.value)
                    ? cacheSelected.filter(
                        (selected) => selected !== item.value
                      )
                    : [...cacheSelected, item.value]
                );
            }}
          >
            <b>{item.value}、</b>
            <TopicOptionWord dangerouslySetInnerHTML={{ __html: item.label }} />
          </TopicOption>
        ))}
      </TopicOptionGroup>
      <EmitConfirmBtn
        disabled={readOnly}
        shape="round"
        icon={<CheckOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onConfirm && onConfirm(cacheSelected);
        }}
      >
        提交答案
      </EmitConfirmBtn>
      {readOnly && (
        <Result
          style={{ marginTop: 16 }}
          result={answer.join("、")}
          analyze={analyze}
        />
      )}
    </TopicCard>
  );
};

// 逻辑题
const Component = ({
  headerExtraLeft,
  title,
  content,
  answer,
  analyze,
  showResult,
  showAnswer,
  onConfirm,
  ...props
}) => {
  const [cacheContnt, setCacheContent] = useState(content);

  const readOnly = showAnswer || showResult;

  return (
    <TopicCard {...props}>
      <TopicHeader>
        {headerExtraLeft}
        <TopicTitle dangerouslySetInnerHTML={{ __html: title }} />
      </TopicHeader>
      <TopicTextArea
        rows={4}
        readOnly={readOnly}
        value={cacheContnt}
        placeholder="请输入内容"
        onChange={(e) => setCacheContent(e.target.value)}
      />
      <EmitConfirmBtn
        disabled={readOnly}
        shape="round"
        icon={<CheckOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onConfirm && onConfirm(cacheContnt);
        }}
      >
        提交答案
      </EmitConfirmBtn>
      {readOnly && (
        <Result style={{ marginTop: 16 }} result={answer} analyze={analyze} />
      )}
    </TopicCard>
  );
};

Component.Single = SingleTopic;
Component.Boolean = SingleTopic;
Component.Multiple = MultipleTopic;
Component.Indefinite = MultipleTopic;

export default Component;
