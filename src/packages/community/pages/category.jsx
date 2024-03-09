import {Carousel, Image, Space, Tag} from "antd";
import { Link } from "react-router-dom";
import { ProCard } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { GetPostModules } from "@package_community/services/post";
import { styled } from "styled-components";
import { Container } from "@components/Container";
import {useState} from "react";
import { GetPostCarsouels, GetIfPosts } from "@package_community/services/post";
import {LoadingOutlined} from "@ant-design/icons";

const ApplicationCell = styled.div`
  margin-left: 10px;
  flex: 1 0 0;
  width: 0;
`;

const ApplicationTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ApplicationDesc = styled.p`
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: #6c757d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 300;
  font-style: normal;
`;
const HeaderTop = styled.div`
  display: flex;
  gap: 8px;
  margin-block-end: 10px;
`;
const HeaderTopSide = styled.div`
  flex: 1 0 0;
  width: 0;
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

const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;


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




const ArticleTopCard = ({ activeKey, items = [], loading, onChange }) => {
    const tabbars = [
        {
            key: "hot",
            title: "热门内容",
            selectedColor: "error",
        },
        {
            key: "new",
            title: "最新内容",
            selectedColor: "processing",
        },
    ];

    return (
        <>
            <Space size={2}>
                {tabbars.map((item) => (
                    <Tag
                        bordered={false}
                        style={{ cursor: "pointer",width:"100px",    "font-weight": "900",height: "25px","font-size": "14px","text-align": "center", "line-height": "25px" }}
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
                            to={"/community/article/" + item.tid} style={{"font-weight": "900"}}
                            dangerouslySetInnerHTML={{ __html: item.subject }}
                        />
                        <span className="article-date">{item.dateline}</span>
                    </div>
                ))}
            </ArticleList>
        </>
    );
};


const Application = ({ thumb, title, desc, ...props }) => {
  return (
    <ProCard layout="center" bodyStyle={{ padding: 14 }} {...props}>
      <Image src={thumb} width={54} height={54} preview={false} />
      <ApplicationCell>
        <ApplicationTitle title={title}>{title}</ApplicationTitle>
        <ApplicationDesc>{desc}</ApplicationDesc>
      </ApplicationCell>
    </ProCard>
  );
};

const Component = () => {
  const { data: postModules } = useRequest(GetPostModules);
    const [sort, setSort] = useState("hot");
    const { data: carsouels } = useRequest(GetPostCarsouels, {
        defaultParams: [{ limit: 6 }],
    });
    const { data: posts, loading } = useRequest(
        () => GetIfPosts({ pageNum: 1, pageSize: 7, sort }),
        { refreshDeps: [sort] }
    );
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

      <Space direction="vertical" size={16}>
        {(postModules || []).map((item) => (
          <ProCard
            wrap
            gutter={[16, 16]}
            title={item.name}
            key={item.fid}
            bordered
          >
            {(item.children || []).map((item) => (
              <ProCard ghost colSpan={6}>
                <Link to={"/community/list/" + item.fid}>
                  <Application
                    thumb={item.icon}
                    title={item.name}
                    desc={"贴数：" + item.threads}
                    key={item.fid}
                  />
                </Link>
              </ProCard>
            ))}
          </ProCard>
        ))}
      </Space>
    </Container>
  );
};

export default Component;
