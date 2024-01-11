import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  InfiniteScroll,
  Image,
  List,
  Avatar,
  Space,
  NavBar,
} from "antd-mobile";
import { useRequest } from "ahooks";
import {
  GetPostModuleChilds,
  GetPostCategorys,
  GetPosts,
} from "../../../../services/community/post";
import { EyeOutline, ClockCircleOutline } from "antd-mobile-icons";
import { styled } from "styled-components";

import Page from "../../../../components/community/mini/Page";
import LargeTabs from "../../../../components/community/mini/LargeTabs";

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

const CONSTAVATARIMG =
  "http://6uzy.com/uc_server/avatar.php?uid=1&size=middle&ts=1";

const PAGE_SIZE = 24;

const PostListRender = () => {
  const navigate = useNavigate();
  const pageNum = useRef(1);
  const params = useParams();
  const [record, setRecord] = useState([]);
  const [typeId, setTypeId] = useState("");
  const { data: postCategorys } = useRequest(() =>
    GetPostCategorys({ fid: params.id })
  );
  const { refreshAsync: refreshPost, data: posts } = useRequest(
    () =>
      GetPosts({
        fid: params.id,
        typeId,
        pageNum: pageNum.current,
        pageSize: PAGE_SIZE,
      }),
    {
      onSuccess(res) {
        setRecord((record) => [...record, ...(res?.rows || [])]);
        pageNum.current += 1;
      },
      manual: true,
    }
  );

  useEffect(() => {
    pageNum.current = 1;
    setRecord([]);
    refreshPost();
  }, [typeId]);

  const hasMore = posts?.total || 0 > PAGE_SIZE * pageNum.current;

  return (
    <>
      {!!postCategorys?.length && (
        <LargeTabs
          activeKey={typeId}
          tabsStyle={{
            zIndex: 1,
            position: "sticky",
            top: 0,
          }}
          type="capsuleTabs"
          items={[
            {
              title: "全部",
              key: "",
            },
            ...postCategorys.map((item) => ({
              title: item.name,
              key: "" + item.typeid,
            })),
          ]}
          onChange={setTypeId}
        />
      )}
      <List>
        {record.map((item) => (
          <List.Item
            key={item.tid}
            arrow={false}
            prefix={
              <ArticleAuthor>
                <Avatar
                  style={{ "--size": "48px", "--border-radius": "24px" }}
                  src={item.photoUrl}
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
      </List>
      <InfiniteScroll hasMore={hasMore} loadMore={refreshPost} />
    </>
  );
};

const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { loading, data: postModuleChilds } = useRequest(
    () => GetPostModuleChilds({ fid: params.id }),
    { refreshDeps: [params] }
  );

  const isModule = !!postModuleChilds?.sub?.length;
  const isPost = postModuleChilds && !postModuleChilds.sub?.length;

  return (
    <>
      <NavBar onBack={() => history.back()}>
        {postModuleChilds?.finfo?.name}
      </NavBar>
      <Page background="#f5f5f5" yScroll style={{ position: "relative" }}>
        {!loading && isModule && (
          <List>
            {postModuleChilds.sub.map((item) => (
              <List.Item
                key={item.fid}
                prefix={<Image width={42} height={42} src={item.icon} />}
                onClick={() => navigate("/m/community/list/" + item.fid, {})}
              >
                {item.name}
              </List.Item>
            ))}
          </List>
        )}
        {!loading && isPost && <PostListRender />}
      </Page>
    </>
  );
};

export default Component;
