import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, NavBar, Image, Swiper } from "antd-mobile";
import { SearchOutline, TextOutline } from "antd-mobile-icons";
import { useRequest } from "ahooks";
import { GetCrousel } from "../../../../services/exam/setting";
import { GetCorrelationCategoryTrees } from "../../../../services/exam/category";
import { GetExamPaperByCertificateId } from "../../../../services/exam/exampaper";
import { styled } from "styled-components";
import Page from "../../../../components/community/mini/Page";
import {ProCard} from "@ant-design/pro-components";

const ExamPaperRoot = styled.div`
  display: flex;
  align-items: center;
  padding-block: 12px;
  line-height: 24px;
  font-size: 16px;
  border-bottom: 1px dashed #ccc;
`;

const ExamPaperTitle = styled.div`
  flex: 1 0 0;
  width: 0;
`;

const ExamPaper = ({ title }) => {
  return (
    <ExamPaperRoot>
      <TextOutline style={{ fontSize: 18, marginRight: 12 }} />
      <ExamPaperTitle>{title}</ExamPaperTitle>
    </ExamPaperRoot>
  );
};

const SectionBlockRoot = styled.div`
  background-color: #fff;
  padding-block: 16px;
`;

const SectionTab = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--adm-color-border);
  .tabs {
    flex: 1;
    :global(.adm-tabs-header) {
      border-bottom-width: 0;
    }
  }
`;

const SectionTabTitle = styled.span`
  margin-inline-start: 10px;
  padding: 2px 6px;
  font-size: 14px;
  color: #1677ff;
  border: 1px solid #1677ff;
  border-radius: 1000px;
`;

const SectionTabWrap = styled.div`
  flex: 1 0 0;
  width: 0;
`;

const SectionCardMain = styled.div`
  padding-inline: 16px;
`;

const SectionBlock = ({ title, items }) => {
  const [activeKey, setActiveKey] = useState("");
  const { run: getExamPapers, data: examPaper } = useRequest(
    GetExamPaperByCertificateId,
    { manual: true }
  );

  useEffect(() => {
    items.length && setActiveKey(items[0].key);
  }, [items]);

  useEffect(() => {
    activeKey && getExamPapers({ courseId: activeKey });
  }, [activeKey]);

  return (
    <SectionBlockRoot>
      <SectionTab>
        <SectionTabTitle>{title}</SectionTabTitle>
        <SectionTabWrap>
          <Tabs stretch={false} activeKey={activeKey} onChange={setActiveKey}>
            {items.map((item) => (
              <Tabs.Tab title={item.label} key={item.key} />
            ))}
          </Tabs>
        </SectionTabWrap>
      </SectionTab>
      <SectionCardMain>
        {examPaper && !examPaper.paper.length && (
          <div style={{ paddingBlock: 56, textAlign: "center", color: "#999" }}>
            暂时没有任何试卷！
          </div>
        )}
        {examPaper &&
          !!examPaper.paper.length &&
          examPaper.paper.map((item) => (
              <Link to={"/m/exam/exercise/sjkm/" + item.id}>
              <ExamPaper title={item.name} key={item.id} />
              </Link>
          ))}
      </SectionCardMain>
    </SectionBlockRoot>
  );
};

const ColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DotIndicator = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.3);
  padding: 4px 8px;
  color: #ffffff;
  border-radius: 4px;
  user-select: none;
`;

const Component = () => {
  const navigate = useNavigate();
  const { data: carousels } = useRequest(GetCrousel, {
    defaultParams: [
      {
        modeId: 38,
        project: 3,
      },
    ],
  });
  const { data: correlationCategoryTrees } = useRequest(
    GetCorrelationCategoryTrees
  );

  return (
    <>
      <NavBar
        backArrow={false}
        right={
          <Link to="/m/exam/search">
            <SearchOutline fontSize={20} />
          </Link>
        }
      >
        资料下载网
      </NavBar>
      <Page background="#f5f5f5" yScroll style={{ position: "relative" }}>
        {!!carousels?.length && (
          <Swiper
            autoplay
            indicator={(total, current) => (
              <DotIndicator>
                {current + 1}/{total}
              </DotIndicator>
            )}
            style={{
              marginBottom: "10px",
            }}
          >
            {(carousels || []).map((item) => (
              <Swiper.Item key={item.id} onClick={() => navigate(item.goUrl)}>
                <Image src={item.imgUrl} height={160} fit="cover" />
              </Swiper.Item>
            ))}
          </Swiper>
        )}
        <ColumnLayout>
          {(correlationCategoryTrees || []).map((item) => (
            <SectionBlock
              title={item.parentName}
              items={item.children.map((item) => ({
                key: item.id,
                label: item.name,
              }))}
              key={item.parentId}
            />
          ))}
        </ColumnLayout>
      </Page>
    </>
  );
};

export default Component;
