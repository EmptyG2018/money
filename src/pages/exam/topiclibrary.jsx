import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { useRequest } from "ahooks";
import { GetCorrelationCategoryTrees } from "../../services/exam/category";
import styled from "styled-components";
import Container from "../../components/Container";

const CategorySection = styled.div`
  background-color: #fff;
  margin-top: 10px;
`;

const CategoryCard = styled(Card)`
  background-color: transparent;
  border-radius: 0;
  &:not(.ant-card-bordered) {
    box-shadow: none;
  }
`;

const CategoryHeader = styled.h2`
  margin: 0;
  font-size: 16px;
`;

const CategoryTag = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  padding: 10px 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #eef3fa;
  cursor: pointer;
  & > a {
    color: #333;
    &:hover {
      color: #1677ff;
    }
  }
`;

const Component = () => {
  const { data: correlationCategoryTrees } = useRequest(
    GetCorrelationCategoryTrees
  );

  return (
    <Container title={false} gutter={[0, 24]}>
      {(correlationCategoryTrees || []).map((item) => (
        <CategorySection key={item.parentId}>
          <CategoryCard
            bordered={false}
            title={<CategoryHeader>{item.parentName}</CategoryHeader>}
          >
            <Row gutter={[10, 10]}>
              {item.children.map((item) => (
                <Col span={4} key={item.id}>
                  <CategoryTag>
                    <Link to={"./" + item.id}>{item.name}</Link>
                  </CategoryTag>
                </Col>
              ))}
            </Row>
          </CategoryCard>
        </CategorySection>
      ))}
    </Container>
  );
};

export default Component;
