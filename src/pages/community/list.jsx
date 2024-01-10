import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useRequest } from "ahooks";
import {
  GetPostModuleChilds,
  GetPostCategorys,
  GetPosts,
} from "../../services/community/post";
import { Avatar, Image, Space } from "antd";
import { EyeOutlined, HistoryOutlined } from "@ant-design/icons";
import { ProCard, ProList } from "@ant-design/pro-components";
import Container from "../../components/Container";

const CONSTAVATARIMG =
  "http://6uzy.com/uc_server/avatar.php?uid=1&size=middle&ts=1";

const PAGE_SIZE = 24;

const PostListRender = () => {
  const listRef = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const [typeId, setTypeId] = useState("");
  const { data: postCategorys } = useRequest(() =>
    GetPostCategorys({ fid: params.id })
  );
  const { runAsync: getPost } = useRequest(GetPosts, {
    manual: true,
  });

  return (
    <>
      <ProList
        rowKey="tid"
        actionRef={listRef}
        pagination={{
          pageSize: 12,
        }}
        request={async ({ current, pageSize, ...args }) => {
          const res = await getPost({
            ...args,
            fid: params.id,
            pageNum: current,
            pageSize: PAGE_SIZE,
            typeId,
          });
          const { rows = [], total = 0 } = res || {};
          return {
            data: rows,
            success: true,
            total,
          };
        }}
        metas={{
          avatar: {
            dataIndex: "author",
            render: (_, { author,photoUrl }) => (
              <Space direction="vertical" align="center" size={0}>
                <Avatar src={photoUrl} />
                <span
                  style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.45)" }}
                >
                  {author}
                </span>
              </Space>
            ),
          },
          title: {
            dataIndex: "subject",
            render: (text, { tid }) => (
              <Link
                to={"/community/article/" + tid}
                style={{
                  color: "initial",
                  fontWeight: "initial",
                  fontSize: "16px",
                }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ),
          },
          description: {
            render: (_, { views, dateline }) => {
              return (
                <Space>
                  <span>
                    <EyeOutlined /> {views}
                  </span>
                  <span>
                    <HistoryOutlined /> {dateline}
                  </span>
                </Space>
              );
            },
          },
        }}
        toolbar={{
          menu: {
            activeKey: typeId,
            items: (postCategorys || []).map((item) => ({
              key: item.typeid,
              label: item.name,
            })),
            onChange: (key) => {
              setTypeId(key);
              listRef.current?.reset();
            },
          },
        }}
      />
    </>
  );
};

const Component = () => {
  const params = useParams();
  const { loading, data: postModuleChilds } = useRequest(
    () => GetPostModuleChilds({ fid: params.id }),
    { refreshDeps: [params] }
  );

  const isModule = !!postModuleChilds?.sub?.length;
  const isPost = postModuleChilds && !postModuleChilds.sub?.length;

  return (
    <Container title={false} gutter={[16, 24]}>
      {!loading && isModule && (
        <ProCard wrap gutter={[16, 16]}>
          {postModuleChilds.sub.map((item) => (
            <ProCard key={item.fid} bordered colSpan={6}>
              <Link to={"/community/list/" + item.fid}>
                <ProCard ghost>
                  <Space>
                    <Image
                      src={item.icon}
                      preview={false}
                      width={32}
                      height={32}
                    />
                    {item.name}
                  </Space>
                </ProCard>
              </Link>
            </ProCard>
          ))}
        </ProCard>
      )}
      {!loading && isPost && <PostListRender />}
    </Container>
  );
};

export default Component;
