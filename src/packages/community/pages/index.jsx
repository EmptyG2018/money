import { useState } from "react";
import {Tag, Carousel, Space, Button, Image} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { GetConfigStyleModuleList } from "@services/setting";
import { GetPostCarsouels, GetIfPosts } from "@package_community/services/post";
import styled, { css } from "styled-components";
import { Container } from "@components/Container";
import {ProCard} from "@ant-design/pro-components";

const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyleModuleRoot = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  ${({ $bordered }) =>
    $bordered &&
    css`
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      overflow: hidden;
    `}
  ${({ $between }) =>
    $between &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}
`;

const StyleModuleImg = styled.img`
  display: block;
  width: 100%;
`;

const StyleModuleBody = styled.div`
  padding: 10px;
`;

const StyleModuleTitle = styled(Ellipsis)`
  flex: 1 0 0;
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
`;

const StyleModuleDesc = styled.div`
  font-size: 12px;
  color: #444;
`;



const StyleModuleA = ({ url, title, imgStyle, ...props }) => {
  return (
    <StyleModuleRoot style={{ width: 154 }} {...props}>
      <StyleModuleImg style={imgStyle} src={url} />
      <StyleModuleTitle>{title}</StyleModuleTitle>
    </StyleModuleRoot>
  );
};

const StyleModuleB = ({ url, title, imgStyle, ...props }) => {
  return (
    <StyleModuleRoot $bordered style={{ width: 214 }} {...props}>
      <StyleModuleImg style={imgStyle} src={url} />
      <StyleModuleBody>
        <StyleModuleTitle>{title}</StyleModuleTitle>
      </StyleModuleBody>
    </StyleModuleRoot>
  );
};

const StyleModuleC = ({ title, desc, ...props }) => {
  return (
    <StyleModuleRoot
      $between
      style={{ paddingInline: "8px", width: 280 }}
      {...props}
    >
      <StyleModuleTitle bold>{title}</StyleModuleTitle>
      <StyleModuleDesc>{desc}</StyleModuleDesc>
    </StyleModuleRoot>
  );
};



const StyleModuleD = ({ url, title,imgStyle, ...props }) => {
  return (
    <StyleModuleRoot $bordered style={{ width: "19%" }} {...props}>

      <ProCard ghost style={{display: "block" , "box-sizing": "border-box","text-overflow": "ellipsis", height: "100%", "padding-inline": "24px", "padding-block": "16px"}}>
        <Space>
          <Image
              src={url}
              preview={false}
              width={50}
              height={50}
          />
          {title}
        </Space>
      </ProCard>

    </StyleModuleRoot>
  );
};

const StyleModuleE = ({ url,imgStyle,goUrl, ...props }) => {
  return (
      <StyleModuleRoot style={{ width: "100%" }} {...props}>
        <Link
            to={goUrl}>
        <StyleModuleImg src={url} style={imgStyle} />
        </Link>
      </StyleModuleRoot>
  );
};

const StyleModuleTemplate = ({ styleKey, imgStyle, items }) => {
  const navigate = useNavigate();

  const styleModuleMap = {
    1: ({ items }) => (
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {items.map((item) => (
          <StyleModuleA
            key={item.tid}
            url={item.attachment}
            title={item.subject}
            imgStyle={imgStyle}
            onClick={() => navigate("/community/article/" + item.tid)}
          />
        ))}
      </div>
    ),
    2: ({ items }) => (
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {items.map((item) => (
          <StyleModuleB
            key={item.tid}
            url={item.attachment}
            title={item.subject}
            imgStyle={imgStyle}
            onClick={() => navigate("/community/article/" + item.tid)}
          />
        ))}
      </div>
    ),
    3: ({ items }) => (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((item) => (
          <StyleModuleC
            key={item.tid}
            title={item.subject}
            onClick={() => navigate("/community/article/" + item.tid)}
          />
        ))}
      </div>
    ),
    4: ({ items }) => (
        <div style={{ display: "flex",  gap: "12px",flexWrap: "wrap" }}>
          {items.map((item) => (
              <StyleModuleD
                  key={item.tid}
                  url={item.attachment}
                  title={item.subject}
                  imgStyle={imgStyle}
                  onClick={() => navigate("/community/list/" + item.fid)}
              />
          ))}
        </div>
    ),
    5: ({ items }) => (
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {items.map((item) => (
              <StyleModuleE
                  key={item.tid}
                  url={item.photoUrl}
                  goUrl={item.goUrl }
              />
          ))}
        </div>
    ),
  };
  return styleModuleMap[styleKey] ? styleModuleMap[styleKey]({ items }) : null;
};

/**
 * @title 轮播图
 */
const SwiperRoot = styled(Carousel)`
  .slick-dots li button {
    background-color: #1677ff;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .slick-dots li.slick-active button {
    background-color: #1677ff;
  }
`;

const SwiperPlaceholder = styled.div`
  width: 100%;
  height: 240px;
  background-color: #ddd;
`;

const SwiperPage = styled(SwiperPlaceholder)`
  position: relative;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
`;

const SwiperDescription = styled(Ellipsis)`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 14px;
`;

const Swiper = ({ items = [], placeholder }) => {
  return items.length ? (
    <SwiperRoot autoplay dotPosition="top">
      {items.map((item) => (
        <Link to={"/community/article/" + item.tid} key={item.tid}>
          <SwiperPage src={item.threadimage}>
            <SwiperDescription>{item.subject}</SwiperDescription>
          </SwiperPage>
        </Link>
      ))}
    </SwiperRoot>
  ) : (
    placeholder
  );
};

/**
 * @title Top文章
 */
const ArticleList = styled.div`
  margin-top: 8px;
  .article-item {
    display: flex;
    align-items: center;
    line-height: 30px;
    &:nth-child(1) {
      .article-order {
        background-color: #ff4d4f;
      }
      .article-title {
        color: #ff4d4f;
      }
    }
    &:nth-child(2) {
      .article-order {
        background-color: #faad14;
      }
      .article-title {
        color: #faad14;
      }
    }
    &:nth-child(3) {
      .article-order {
        background-color: #1677ff;
      }
      .article-title {
        color: #1677ff;
      }
    }

    .article-order {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 1000px;
      border-top-right-radius: 0;
      background-color: #999;
      color: #fff;
      font-size: 12px;
    }
    .article-title {
      flex: 1 0 0;
      width: 0;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      margin-inline: 6px;
    }
    .article-date {
      color: #9b9b9b;
      font-size: 12px;
    }
  }
`;

const ArticleTopCard = ({ activeKey, items = [], loading, onChange }) => {
  const tabbars = [
    {
      key: "hot",
      title: "热门",
      selectedColor: "error",
    },
    {
      key: "new",
      title: "最新",
      selectedColor: "processing",
    },
  ];

  return (
    <>
      <Space size={2}>
        {tabbars.map((item) => (
          <Tag
            bordered={false}
            style={{ cursor: "pointer" }}
            color={item.key === activeKey ? item.selectedColor : undefined}
            key={item.key}
            onClick={() => {
              onChange && onChange(item.key);
            }}
          >
            {item.title}
          </Tag>
        ))}
        {loading && <LoadingOutlined />}
      </Space>
      <ArticleList>
        {items.map((item, index) => (
          <div className="article-item" key={item.tid}>
            <span className="article-order">{index + 1}</span>
            <Link
              className="article-title"
              to={"/community/article/" + item.tid}
              dangerouslySetInnerHTML={{ __html: item.subject }}
            />
            <span className="article-date">{item.dateline}</span>
          </div>
        ))}
      </ArticleList>
    </>
  );
};

const StyleModueSection = styled.div`
  margin-bottom: 16px;
`;

const StyleModule = ({ items }) => {
  const imgStyleFn = (style) => {
    if (!style) return {};
    try {
      return JSON.parse(style);
    } catch {
      return {};
    }
  };

  const render = items.map((item) => (
    <StyleModueSection key={item.id}>
      <StyleModuleTemplate
        styleKey={item.moduleId}
        imgStyle={imgStyleFn(item.styleConfig)}
        items={item.listfrom}
      />
    </StyleModueSection>
  ));
  return render;
};

const HeaderTop = styled.div`
  display: flex;
  gap: 8px;
  margin-block-end: 10px;
`;

const HeaderTopSide = styled.div`
  flex: 1 0 0;
  width: 0;
`;

const Main = styled.div``;

const Component = () => {
  const [sort, setSort] = useState("hot");
  const { data: carsouels } = useRequest(GetPostCarsouels, {
    defaultParams: [{ limit: 6 }],
  });
  const { data: posts, loading } = useRequest(
    () => GetIfPosts({ pageNum: 1, pageSize: 7, sort }),
    { refreshDeps: [sort] }
  );
  const { data: styleModuleList } = useRequest(GetConfigStyleModuleList, {
    defaultParams: [
      {
        pageId: 1,
        projectId: 2,
        terminal: 1,
      },
    ],
  });

  return (
    <Container $gutter={[16, 24]}>
      <HeaderTop>
        <HeaderTopSide>
          <Swiper items={carsouels || []} placeholder={<SwiperPlaceholder />} />
        </HeaderTopSide>
        <HeaderTopSide>
          <ArticleTopCard
            activeKey={sort}
            items={posts?.rows || []}
            loading={loading}
            onChange={setSort}
          />
        </HeaderTopSide>
      </HeaderTop>
      <Main>
        <StyleModule items={styleModuleList || []} />
      </Main>
    </Container>
  );
};

export default Component;
