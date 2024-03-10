import {useRef, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { Card, List } from "antd";
import { useRequest } from "ahooks";
import {GetChapterBySubjectId, GetSubjectByCourseId} from "../../../../services/exam/category";
import styled from "styled-components";
import { Container } from "../../../../components/Container";
import {NavBar} from "antd-mobile";
import Page from "../../../../components/community/mini/Page";

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
    const scrollBar = useRef();

    const [pagination, setPagination] = useState([1, 10]);
    const { data: subject } = useRequest(GetSubjectByCourseId, {
        defaultParams: [{ pId: params.id }],
    });
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
      <>
      <NavBar backArrow onBack={() => history.back()}>
          {subject?.courseName} 章节练习
      </NavBar>
      <Page ref={scrollBar} background="#f5f5f5">
      <NoStyledCard>
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
              <ChapterLink to={"/m/exam/exercise/zjkm/" + item.id}>
                <Chapter title={item.name} />
              </ChapterLink>
            </List.Item>
          )}
        />
      </NoStyledCard>
          </Page>
      </>
  );
};

export default Component;
