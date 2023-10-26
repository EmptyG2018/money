import { useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button, Card, List, Space } from "antd";
import { FileTextTwoTone } from "@ant-design/icons";
import { useRequest } from "ahooks";
import Container from "../../components/Container";
import styled, { css } from "styled-components";
import { RightOutline } from "antd-mobile-icons";

const Main = styled.div`
  display: flex;
  gap: 24px;
`;

const ExamPaper = styled(Card)`
  flex: 1 0 0;
  width: 0;
`;

const AnswerCard = styled(Card)`
  width: 280px;
`;

const Component = () => {
  return (
    <Container title={false} gutter={[0, 24]}>
      <Main>
        <ExamPaper>
          
        </ExamPaper>
        <AnswerCard></AnswerCard>
      </Main>
    </Container>
  );
};

export default Component;
