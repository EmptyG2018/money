import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { NavBar, Grid } from "antd-mobile";
import { useRequest } from "ahooks";
import { GetCorrelationCategoryTrees } from "../../../services/exam/category";
import Page from "../../../components/community/mini/Page";
import styled from "styled-components";

const ColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  min-height: 56px;
  padding-inline: 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  font-weight: 600;
  background-color: #fff;
`;

const CardContent = styled.div`
  padding: 16px;
  background-color: #fff;
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
    text-decoration: none;
  }
`;

const Component = () => {
  const scrollBar = useRef();
  const navigate = useNavigate();
  const { data: correlationCategoryTrees } = useRequest(
    GetCorrelationCategoryTrees
  );

  return (
    <>
      <NavBar backArrow={false}>试题库</NavBar>
      <Page ref={scrollBar} background="#f5f5f5" yScroll>
        <div style={{ height: "10px" }}></div>
        <ColumnLayout>
          {(correlationCategoryTrees || []).map((item) => (
            <Card>
              <CardHeader>{item.parentName}</CardHeader>
              <CardContent>
                <Grid columns={2} gap={10}>
                  {item.children.map((item) => (
                    <Grid.Item key={item.id}>
                      <CategoryTag>
                        <Link to={"/m/exam/certificate/" + item.id}>
                          {item.name}
                        </Link>
                      </CategoryTag>
                    </Grid.Item>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))}
        </ColumnLayout>
      </Page>
    </>
  );
};

export default Component;
