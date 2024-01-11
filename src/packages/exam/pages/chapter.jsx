import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, List } from "antd";
import { useRequest } from "ahooks";
import { GetChapterBySubjectId } from "../../../services/exam/category";
import styled from "styled-components";
import Container from "../../../components/Container";

const NoStyledCard = styled(Card)`
  border-radius: 0;
  &:not(.ant-card-bordered) {
    box-shadow: none;
  }
`;

const ChapterLink = styled(Link)`
  &:hover {
    .ant-card {
      color: #1677ff !important;
    }
  }
`;

const ChapterRoot = styled(NoStyledCard)`
  width: 100%;
  &:not(.ant-card-bordered) {
    box-shadow: none;
  }
`;

const ChapterTitle = styled.div`
  font-size: 16px;
  img {
    max-width: 100%;
  }
`;

const Chapter = ({ title }) => {
  return (
    <ChapterRoot bordered={false} bodyStyle={{ padding: "8px 0" }}>
      <ChapterTitle>{title}</ChapterTitle>
    </ChapterRoot>
  );
};

const Component = () => {
  const params = useParams();
  const [pagination, setPagination] = useState([1, 10]);
  const { data: chapters } = useRequest(
    () =>
      GetChapterBySubjectId({
        subjectid: params.id,
        pageNum: pagination[0],
        pageSize: pagination[1],
      }),
    { refreshDeps: [pagination, params] }
  );

  return (
    <Container title={false} gutter={[0, 24]}>
      <NoStyledCard title="章节练习">
        <List
          rowKey="id"
          dataSource={chapters?.rows || []}
          pagination={{
            current: pagination[0],
            pageSize: pagination[1],
            total: chapters?.total,
            onChange: (current, size) => setPagination([current, size]),
          }}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <ChapterLink to={"/exam/exercise/zjkm/" + item.id}>
                <Chapter title={item.name} />
              </ChapterLink>
            </List.Item>
          )}
        />
      </NoStyledCard>
    </Container>
  );
};

export default Component;
