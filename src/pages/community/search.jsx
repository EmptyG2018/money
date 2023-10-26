import { useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Space, Avatar } from "antd";
import { EyeOutline, HistogramOutline } from "antd-mobile-icons";
import { ProList } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { GetKeywordPosts } from "../../services/community/post";
import Container from "../../components/Container";
import styled from "styled-components";

const CONSTAVATARIMG =
  "http://6uzy.com/uc_server/avatar.php?uid=1&size=middle&ts=1";

const Info = styled.div`
  margin-bottom: 24px;
  padding-inline: 12px;
`;

const Component = () => {
  const listRef = useRef();
  const [searchParams] = useSearchParams();
  const word = searchParams.get("keyword");
  const keyword = decodeURIComponent(word || "");

  const { runAsync: getKeywordPost } = useRequest(GetKeywordPosts, {
    manual: true,
  });

  useEffect(() => {
    !!word && listRef.current?.reload();
  }, [word]);

  return (
    <Container title={false} gutter={[16, 24]}>
      <Info>以下关于 “{keyword}” 的搜索结果：</Info>
      <ProList
        rowKey="tid"
        actionRef={listRef}
        pagination={{
          pageSize: 24,
        }}
        request={async ({ current, pageSize }) => {
          const res = await getKeywordPost({
            title: keyword,
            pageNum: current,
            pageSize,
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
            render: (_, { author }) => (
              <Space direction="vertical" align="center" size={0}>
                <Avatar src={CONSTAVATARIMG} />
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
                    <EyeOutline /> {views}
                  </span>
                  <span>
                    <HistogramOutline /> {dateline}
                  </span>
                </Space>
              );
            },
          },
        }}
      />
    </Container>
  );
};

export default Component;
