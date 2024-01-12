import { Card } from "antd";
import styled from "styled-components";
import { Container } from "../../../components/Container";

const Topic = styled(Card)``;
const TopicTitle = styled.h3`
  margin: 0;
  margin-block-end: 24px;
  font-size: 18px;
  font-weight: 400;
  color: #333;
`;

const TopicOptionGroup = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TopicOption = styled.li`
  font-size: 15px;
  margin-bottom: 12px;
  color: #5e5e5e;
`;

const Component = () => {
  return (
    <Container $gutter={[0, 24]}>
      <Topic>
        <TopicTitle>
          经酸洗后的设备和管道内壁要进行钝化，钝化时应遵循的规定（）。
        </TopicTitle>
        <TopicOptionGroup>
          <TopicOption>A.酸洗后的设备和管道，应在两周内钝化</TopicOption>
          <TopicOption>B.钝化液通常采用亚硝酸钠溶液</TopicOption>
          <TopicOption>C.钝化结束后，要用偏碱的水冲洗</TopicOption>
          <TopicOption>D.钝化时不得采用流动清洗法</TopicOption>
        </TopicOptionGroup>
      </Topic>
    </Container>
  );
};

export default Component;
