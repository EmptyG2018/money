import { useRef } from "react";
import { Image, Space, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  FireFilled,
  ThunderboltFilled,
  EyeOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { ProCard, ProList } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { GetPostBannars, GetIfPosts } from "../../services/community/post";
import { styled } from "styled-components";
import Container from "../../components/Container";

const CONSTAVATARIMG =
  "http://6uzy.com/uc_server/avatar.php?uid=1&size=middle&ts=1";

const PAGE_SIZE = 24;

const Component = () => {
  const listRef = useRef();

  const { data: newPosts } = useRequest(GetIfPosts, {
    defaultParams: [{ pageNum: 1, pageSize: 12, sort: "new" }],
  });
  const { data: hostPosts } = useRequest(GetIfPosts, {
    defaultParams: [{ pageNum: 1, pageSize: 12, sort: "host" }],
  });

  return (
    <Container title={false} gutter={[16, 24]}>
      <ProCard ghost gutter={16}>
        <ProCard
          title={
            <span style={{ color: "#ff5900" }}>
              <FireFilled /> 热门帖子
            </span>
          }
        >
          <ProList
            rowKey="tid"
            actionRef={listRef}
            dataSource={newPosts?.rows || []}
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
          />
        </ProCard>
        <ProCard
          title={
            <span style={{ color: "#2f86ff" }}>
              <ThunderboltFilled /> 最新帖子
            </span>
          }
        >
          <ProList
            rowKey="tid"
            actionRef={listRef}
            dataSource={hostPosts?.rows || []}
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
          />
        </ProCard>
      </ProCard>
    </Container>
  );
};

export default Component;
