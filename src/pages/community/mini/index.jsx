import { Link, useNavigate } from "react-router-dom";
import { List, Space, Avatar, NavBar, Image, Swiper } from "antd-mobile";
import {
  FireFill,
  EyeOutline,
  ClockCircleOutline,
  SearchOutline,
} from "antd-mobile-icons";
import { styled } from "styled-components";
import { useRequest } from "ahooks";
import { GetPostBannars, GetIfPosts } from "../../../services/community/post";
import Page from "../../../components/community/mini/Page";

const CONSTAVATARIMG =
  "http://6uzy.com/uc_server/avatar.php?uid=1&size=middle&ts=1";

const ArticleList = styled(List)`
  margin-bottom: 10px;
  --header-font-size: 16px;
  .adm-list-header {
    background-color: #fff;
    padding-block: 10px;
  }
`;

const ArticleAuthor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  font-size: 12px;
  color: #999;
`;

const NickName = styled.span`
  display: inline-block;
  width: 48px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`;

const ArticleTitle = styled.h2`
  display: flex;
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  height: 48px;
  line-height: 24px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ArticleDesc = styled.div`
  margin-block-start: 4px;
`;

const Component = () => {
  const navigate = useNavigate();
  const { data: postBannars } = useRequest(GetPostBannars, {
    defaultParams: [{ modeId: 31 }],
  });
  const { data: newPosts } = useRequest(GetIfPosts, {
    defaultParams: [{ pageNum: 1, pageSize: 12, sort: "new" }],
  });
  const { data: hostPosts } = useRequest(GetIfPosts, {
    defaultParams: [{ pageNum: 1, pageSize: 12, sort: "host" }],
  });

  return (
    <>
      <NavBar
        backArrow={false}
        right={
          <Link to="/m/community/search">
            <SearchOutline fontSize={20} />
          </Link>
        }
      >
        资料下载网
      </NavBar>
      <Page background="#f5f5f5" yScroll style={{ position: "relative" }}>
        {postBannars?.length && (
          <Swiper
            autoplay
            style={{
              marginBottom: "10px",
            }}
          >
            {postBannars.map((item) => (
              <Swiper.Item key={item.id}>
                <Image
                  src={item.imgUrl}
                  height={120}
                  onClick={() => window.open(item.goUrl)}
                />
              </Swiper.Item>
            ))}
          </Swiper>
        )}

        {hostPosts?.rows?.length && (
          <ArticleList
            header={
              <span style={{ color: "#ff5900" }}>
                <FireFill /> 热门帖子
              </span>
            }
          >
            {hostPosts.rows.map((item) => (
              <List.Item
                key={item.tid}
                arrow={false}
                prefix={
                  <ArticleAuthor>
                    <Avatar
                      style={{ "--size": "48px", "--border-radius": "24px" }}
                      src={CONSTAVATARIMG}
                      fit="cover"
                    />
                    <NickName>{item.author}</NickName>
                  </ArticleAuthor>
                }
                description={
                  <ArticleDesc>
                    <Space align="center" style={{ "--gap": "12px" }}>
                      <span>
                        <EyeOutline /> {item.views}
                      </span>
                      <span>
                        <ClockCircleOutline /> {item.dateline}
                      </span>
                    </Space>
                  </ArticleDesc>
                }
                onClick={() => navigate("/m/community/article/" + item.tid)}
              >
                <ArticleTitle
                  dangerouslySetInnerHTML={{ __html: item.subject }}
                ></ArticleTitle>
              </List.Item>
            ))}
          </ArticleList>
        )}

        {newPosts?.rows?.length && (
          <ArticleList
            header={
              <span style={{ color: "#2f86ff" }}>
                <FireFill /> 最新帖子
              </span>
            }
          >
            {newPosts.rows.map((item) => (
              <List.Item
                key={item.tid}
                arrow={false}
                prefix={
                  <ArticleAuthor>
                    <Avatar
                      style={{ "--size": "48px", "--border-radius": "24px" }}
                      src={CONSTAVATARIMG}
                      fit="cover"
                    />
                    <NickName>{item.author}</NickName>
                  </ArticleAuthor>
                }
                description={
                  <ArticleDesc>
                    <Space align="center" style={{ "--gap": "12px" }}>
                      <span>
                        <EyeOutline /> {item.views}
                      </span>
                      <span>
                        <ClockCircleOutline /> {item.dateline}
                      </span>
                    </Space>
                  </ArticleDesc>
                }
                onClick={() => navigate("/m/community/article/" + item.tid)}
              >
                <ArticleTitle
                  dangerouslySetInnerHTML={{ __html: item.subject }}
                ></ArticleTitle>
              </List.Item>
            ))}
          </ArticleList>
        )}
      </Page>
    </>
  );
};

export default Component;
