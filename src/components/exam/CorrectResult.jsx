import styled from "styled-components";

const ComponentRoot = styled.div`
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

const Component = ({ result, analyze, ...props }) => {
  return (
    <ComponentRoot {...props}>
      <ResultItem>
        <ResultLabel>正确答案：</ResultLabel>
        <div dangerouslySetInnerHTML={{ __html: result }}></div>
      </ResultItem>
      <ResultItem>
        <ResultLabel>本题解析：</ResultLabel>
        <div dangerouslySetInnerHTML={{ __html: analyze }}></div>
      </ResultItem>
    </ComponentRoot>
  );
};

export default Component;
