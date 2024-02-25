import { useState, useEffect } from "react";
import { Card, Tabs, Carousel, Spin } from "antd";
import { FileTextTwoTone } from "@ant-design/icons";
import { Link ,useNavigate} from "react-router-dom";
import { useRequest } from "ahooks";
import { GetCrousel } from "../../../services/exam/setting";
import {
  GetAllCategoryTrees,
  GetCorrelationCategoryTrees,
} from "../../../services/exam/category";
import { GetExamPaperByCertificateId } from "../../../services/exam/exampaper";
import styled from "styled-components";
import { Container } from "../../../components/Container";

const ExamPaperRoot = styled.div`
  display: flex;
  align-items: center;
  height: 54px;
  font-size: 15px;
  border-bottom: 1px dashed #ccc;
`;

const ExamPaper = ({ title }) => {
  return (
    <ExamPaperRoot>
      <FileTextTwoTone style={{ fontSize: 18, marginRight: 12 }} />
      {title}
    </ExamPaperRoot>
  );
};

const EntryCardRoot = styled(Card)`
  width: 240px;
  height: 100px;
  color: #fff;
  border-radius: 4px;
`;

const EntryCardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const EntryCardDesc = styled.div`
  font-size: 16px;
`;

const EntryCard = ({ title, desc, ...props }) => {
  return (
    <EntryCardRoot
      bordered={false}
      bodyStyle={{ paddingLeft: 30, paddingTop: 18 }}
      {...props}
    >
      <EntryCardTitle>{title}</EntryCardTitle>
      <EntryCardDesc>{desc}</EntryCardDesc>
    </EntryCardRoot>
  );
};

const FullCarouselRoot = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

const FullCarouselControl = styled(Carousel)`
  z-index: 1;
  position: absolute;
`;

const FullCarouselThumb = styled.img`
  display: block;
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const FullCarouselMenu = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 50%;
  width: 210px;
  margin-left: -576px;
`;

const FullCarouselMenuItem = styled.div`
  width: 100%;
  background-color: #fff;
  .full-carousel__menu-item {
    padding: 0 12px 0 24px;
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 15px;
    cursor: pointer;
  }

  .full-carousel__dialog {
    display: none;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 210px;
    width: 942px;
    height: 400px;
    padding-inline: 24px;
    background-color: rgba(255, 255, 255, 0.8);
    overflow-y: auto;
  }

  &:nth-child(odd) {
    background-color: #f7f7fa;
  }
  &:hover {
    .full-carousel__menu-item {
      color: #1677ff;
    }
    .full-carousel__dialog {
      display: block;
    }
  }
`;

const FullCarouselCategory = styled.div`
  padding: 12px 0 12px 0;
`;

const FullCarouselSubCategory = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FullCarouselSubCategoryItem = styled.div`
  box-sizing: border-box;
  width: 25%;
  margin-top: 16px;
  padding-inline: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FullCarousel = ({
  items,
  categorys,
  menuItemRender,
  categoryItemRender,
  subCategoryItemRender,
}) => {
  return (
    <FullCarouselRoot>
      {!!items.length && (
        <FullCarouselControl autoplay>
          {items.map((item, index) => (
            <div key={index}>
              <Link to={item.goUrl}>
                <FullCarouselThumb src={item.imgUrl} />
              </Link>
            </div>
          ))}
        </FullCarouselControl>
      )}
      <FullCarouselMenu>
        {categorys.slice(0, 8).map((item) => (
          <FullCarouselMenuItem key={item.parentId}>
            <div className="full-carousel__menu-item" >
              {menuItemRender(item)}
            </div>
            {!!item.children?.length && (
              <div className="full-carousel__dialog">
                {item.children.map((item) => (
                  <FullCarouselCategory key={item.id}>
                    {categoryItemRender(item)}
                    {!!item.children?.length && (
                      <FullCarouselSubCategory>
                        {item.children.map((item) => (
                          <FullCarouselSubCategoryItem key={item.id} >
                              {subCategoryItemRender(item)}
                          </FullCarouselSubCategoryItem>
                        ))}
                      </FullCarouselSubCategory>
                    )}
                  </FullCarouselCategory>
                ))}
              </div>
            )}
          </FullCarouselMenuItem>
        ))}
      </FullCarouselMenu>
    </FullCarouselRoot>
  );
};

const SectionBlockRoot = styled.div`
  background-color: #fff;
`;

const SectionHeader = styled.h2`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  margin-right: 32px;
  &::before {
    display: block;
    content: "";
    width: 4px;
    height: 20px;
    background-color: #1677ff;
    margin-right: 12px;
  }
`;

const SectionCard = styled(Card)`
  &:not(.ant-card-bordered) {
    box-shadow: none;
  }
`;

const SectionTab = styled(Tabs)`
  .ant-tabs-nav {
    padding-block: 10px;
    margin-bottom: 0;
  }
  .ant-tabs-tab-btn {
    font-size: 15px;
  }
`;

const SectionCardBody = styled.div`
  display: flex;
  padding: 16px;
  gap: 24px;
`;

const SectionCardMain = styled.div`
  flex: 1 0 0;
  width: 0;
`;

const SectionCardSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionBlock = ({ title, items }) => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("");
  const {
    run: getExamPapers,
    loading,
    data: examPaper,
  } = useRequest(GetExamPaperByCertificateId, { manual: true });

  useEffect(() => {
    items.length && setActiveKey(items[0].key);
  }, [items]);

  useEffect(() => {
    activeKey && getExamPapers({ courseId: activeKey });
  }, [activeKey]);

  return (
    <SectionBlockRoot>
      <SectionCard
        bordered={false}
        style={{ borderRadius: 0 }}
        bodyStyle={{ padding: 0 }}
      >
        <SectionTab
          activeKey={activeKey}
          tabBarExtraContent={{
            left: <SectionHeader>{title}</SectionHeader>,
          }}
          items={items}
          onChange={setActiveKey}
        />
      </SectionCard>
      <SectionCardBody>
        <SectionCardMain>
          <Spin spinning={loading} delay={500}>
            {examPaper && !examPaper.paper.length && (
              <div
                style={{ paddingTop: 56, textAlign: "center", color: "#999" }}
              >
                暂时没有任何试卷！
              </div>
            )}
            {examPaper &&
              !!examPaper.paper.length &&
              examPaper.paper.map((item) => (
                  <Link to={"/exam/exercise/sjkm/" + item.id} >
                  <ExamPaper title={item.name} key={item.id}  />
                  </Link>
              ))}
          </Spin>
        </SectionCardMain>
        <SectionCardSide>
          <EntryCard
            title="每日一练"
            desc="Practice daily"
            style={{ backgroundColor: "#2ed0a7" }}
            onClick={() => navigate("/exam/certificate/"+activeKey)}

          />
          <EntryCard
            title="模拟考题"
            desc="Mock test"
            style={{ backgroundColor: "#578ef9" }}
            onClick={() => navigate("/exam/certificate/"+activeKey)}

          />
          <EntryCard
            title="历年真题"
            desc="Past real questions"
            style={{ backgroundColor: "#ffc123" }}
            onClick={() => navigate("/exam/certificate/"+activeKey)}

          />
          <EntryCard
            title="章节练习"
            desc="Chapter exercises"
            style={{ backgroundColor: "#fe5656" }}
            onClick={() => navigate("/exam/certificate/"+activeKey)}

          />
        </SectionCardSide>
      </SectionCardBody>
    </SectionBlockRoot>
  );
};

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  color: #1677ff;
  &::before {
    display: block;
    content: "";
    width: 4px;
    height: 18px;
    background-color: #1677ff;
    margin-right: 6px;
  }
`;

const CategoryItem = styled(Link)`
  color: #0e0e0e;
    & > a {
    color: #0e0e0e;
    &:hover {
      color: #1677ff;
    }
  }
`;

const Component = () => {
  const { data: carsouels } = useRequest(GetCrousel, {
    defaultParams: [
      {
        modeId: 37,
        project: 3,
      },
    ],
  });
  const { data: allCategoryTrees } = useRequest(GetAllCategoryTrees);
  const { data: correlationCategoryTrees } = useRequest(
    GetCorrelationCategoryTrees
  );

  return (
    <>
      <FullCarousel
        items={carsouels || []}
        categorys={allCategoryTrees?.result || []}
        menuItemRender={(item) => <div>{item.parentName}</div>}
        categoryItemRender={(item) => (
          <CategoryHeader>{item.name}</CategoryHeader>
        )}
        subCategoryItemRender={(item) => (
          <CategoryItem >
            <Link to={"/exam/certificate/" + item.id}>
            {item.name}
            </Link>
          </CategoryItem>
        )}
      />
      <Container $gutter={[0, 24]}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
        </div>
      </Container>
    </>
  );
};

export default Component;
