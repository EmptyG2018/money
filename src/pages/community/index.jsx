import { useState } from "react";
import { Tag, Carousel, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ProCard } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { GetPostCarsouels, GetIfPosts } from "../../services/community/post";
import { styled } from "styled-components";
import Container from "../../components/Container";

const CarouselWrapper = styled(Carousel)`
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

const Swiper = styled(SwiperPlaceholder)`
  position: relative;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
`;

const SwiperTitle = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  padding: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 14px;
`;

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

const Component = () => {
  const [sort, setSort] = useState("host");
  const { data: carsouels } = useRequest(GetPostCarsouels, {
    defaultParams: [{ limit: 6 }],
  });
  const { data: posts, loading } = useRequest(
    () => GetIfPosts({ pageNum: 1, pageSize: 7, sort }),
    { refreshDeps: [sort] }
  );

  const filters = [
    {
      key: "host",
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
    <Container title={false} gutter={[16, 24]}>
      <ProCard ghost gutter={16} wrap>
        <ProCard ghost colSpan={{ xs: 24, md: 12 }}>
          {carsouels ? (
            <CarouselWrapper autoplay dotPosition="top">
              {(carsouels || []).map((item) => (
                <div>
                  <Swiper src={item.threadimage}>
                    <SwiperTitle>{item.subject}</SwiperTitle>
                  </Swiper>
                </div>
              ))}
            </CarouselWrapper>
          ) : (
            <SwiperPlaceholder />
          )}
        </ProCard>
        <ProCard ghost colSpan={{ xs: 24, md: 12 }}>
          <Space size={2}>
            {filters.map((item) => (
              <Tag
                bordered={false}
                style={{ cursor: "pointer" }}
                color={item.key === sort ? item.selectedColor : undefined}
                key={item.key}
                onClick={() => setSort(item.key)}
              >
                {item.title}
              </Tag>
            ))}
            {loading && <LoadingOutlined />}
          </Space>
          <ArticleList>
            {(posts?.rows || []).map((item, index) => (
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
        </ProCard>
      </ProCard>
      <div style={{ height: 360 }}></div>
    </Container>
  );
};

export default Component;
