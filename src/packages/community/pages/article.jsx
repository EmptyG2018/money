import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import {
  GetPostContent,
  GetPostHideContent,
  DownloadPostAttach,
} from "@package_community/services/post";
import { styled, css } from "styled-components";
import {
  App,
  Alert,
  Typography,
  Avatar,
  Tag,
  Image,
  Space,
  message,
} from "antd";
import { LinkOutlined, DownloadOutlined, LockFilled } from "@ant-design/icons";
import { useUser } from "@hooks/user";
import { useNavigatorPath } from "@hooks/recordPath";
import useDownload from "@hooks/download";
import Byte from "@components/Byte";
import BBcodeRender from "@components/BBCodeRender";
import DownloadFile from "@components/community/DownloadFile";
import { Container } from "@components/Container";
import { ProCard } from "@ant-design/pro-components";

const SINGLE_TAG = ["img", "br", "hr", "input", "link", "meta"];

const deepNodeTree = (children) =>
  children
    .map((item) => {
      if (item.type === "tag") {
        let attrs = "";
        for (let key in item.attribs) {
          attrs += key + "=" + item.attribs[key];
        }
        if (SINGLE_TAG.includes(item.name)) {
          return `<${item.name} ${attrs} />`;
        } else {
          return `<${item.name} ${attrs}>${deepNodeTree(item.children)}</${
            item.name
          }>`;
        }
      }
      if (item.type === "text") return item.data;
    })
    .join("");

const Article = styled.div`
  word-wrap: break-word;
  word-break: break-all;

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    position: relative;
    background-color: #e9f2ff;
    padding: 6px 12px;
    margin: 0;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      display: block;
      width: 4px;
      height: 100%;
      background-color: #1677ff;
    }
    p {
      line-height: 1.5;
    }
  }

  pre {
    padding: 16px;
    background-color: #ececec;
  }
`;

const ArticleTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
`;

const ArticleExtra = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f5f5f5;
`;

const DownloadBtn = styled.button`
  outline: none;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  background-color: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  line-height: 1.5714285714285714;
  color: #fff;
  font-size: 14px;
  height: 32px;
  padding: 4px 15px;
  border-radius: 6px;

  ${({ color }) =>
    color === "primary" &&
    css`
      background-color: #1677ff;
    `}
  ${({ color }) =>
    color === "warning" &&
    css`
      background-color: #ff8f1f;
    `}
`;

const UnLockContent = styled.div`
  padding: 12px 24px;
  border: 1px dashed #1677ff;
  background-color: #edf5ff;
`;

const UnLockContentHeader = styled.div`
  text-align: center;
  line-height: 24px;
  margin-bottom: 8px;
`;

const LockTip = styled(UnLockContent)`
  border-color: #ff8f1f;
  color: #ff8f1f;
  background-color: #fff9f4;
  text-align: center;
`;

const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const app = App.useApp();
  const { user } = useUser();
  const { download } = useDownload();
  const [messageApi, contextHolder] = message.useMessage();
  const navigationPath = useNavigatorPath("/login");

  const { data: post, error: postError } = useRequest(GetPostContent, {
    defaultParams: [{ tid: params.id }],
  });

  const { runAsync: downloadPostAttach } = useRequest(DownloadPostAttach, {
    manual: true,
    onError(error) {
      messageApi.error(error.message);
    },
  });

  const {
    refresh: getHidePost,
    data: hidePost,
    error: hidePostError,
  } = useRequest(() => GetPostHideContent({ tid: params.id }), {
    manual: true,
    onError(err) {
      app.message.error(err.message);
    },
  });

  useEffect(() => {
    post?.readRole === 2 && getHidePost();
  }, [post]);

  const showPost = hidePost || post;

  const showError = hidePostError || postError;

  const replace = (node) => {
    if (node.attribs?.["data-type"] === "hide") {
      const content = deepNodeTree(node?.children);
      return (
        <div style={{ marginBlock: 16 }}>
          {user ? (
            <>
              {showPost.readRole === 0 ? (
                <LockTip>
                  <LockFilled /> 此处内容已隐藏，
                  <Typography.Text
                    underline
                    style={{ color: "inherit" }}
                    onClick={() => navigate("/buykey?id=2")}
                  >
                    开通会员
                  </Typography.Text>
                  可查看
                </LockTip>
              ) : !hidePost ? (
                <LockTip>
                  <LockFilled /> 此处内容已隐藏，
                  <Typography.Text
                    underline
                    style={{ color: "inherit" }}
                    onClick={() => getHidePost()}
                  >
                    点击查看
                  </Typography.Text>
                </LockTip>
              ) : (
                <UnLockContent>
                  <UnLockContentHeader>本帖隐藏内容</UnLockContentHeader>
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </UnLockContent>
              )}
              {}
            </>
          ) : (
            <LockTip>
              <LockFilled /> 此处内容已隐藏，请
              <Typography.Text
                underline
                style={{ color: "inherit" }}
                onClick={() => navigationPath()}
              >
                登录
              </Typography.Text>
              后查看权益
            </LockTip>
          )}
        </div>
      );
    }
    if (node.attribs?.["data-type"] === "attachimg") {
      const aId = node.attribs?.["data-value"];
      const { aid, isimage, attachment } =
        showPost.list.find((item) => item.aid === +aId) || {};
      return (
        !!aid &&
        !!isimage && (
          <div style={{ marginBlock: "16px" }}>
            <Image src={attachment} preview={false} />
          </div>
        )
      );
    }
    if (node.attribs?.["data-type"] === "attach") {
      const aId = node.attribs?.["data-value"];
      const { aid, isimage, filename, attachment, filesize } =
        showPost.list.find((item) => item.aid === +aId) || {};
      return (
        !!aid && (
          <div style={{ marginBlock: "16px" }}>
            {isimage ? (
              <Image src={attachment} preview={false} />
            ) : (
              <DownloadFile
                name={filename}
                size={<Byte byte={filesize} />}
                count={100203}
                state={!user || showPost.downRole === 0 ? "warning" : "primary"}
              >
                {user ? (
                  showPost.downRole === 0 ? (
                    <DownloadBtn
                      color="warning"
                      onClick={() => navigate("/buykey?id=2")}
                    >
                      <LinkOutlined /> 购买会员可下载附件
                    </DownloadBtn>
                  ) : (
                    <DownloadBtn
                      color="primary"
                      onClick={async () => {
                        const bufferData = await downloadPostAttach({ aid });
                        download(bufferData, filename);
                      }}
                    >
                      <DownloadOutlined /> 立即下载附件
                    </DownloadBtn>
                  )
                ) : (
                  <DownloadBtn color="warning" onClick={() => navigationPath()}>
                    <LinkOutlined /> 请登录后查看权益
                  </DownloadBtn>
                )}
              </DownloadFile>
            )}
          </div>
        )
      );
    }
  };

  return (
    <>
      {contextHolder}
      <Container $gutter={[16, 24]}>
        <ProCard>
          {showError && (
            <Alert showIcon type="error" message={showError?.message} />
          )}
          {showPost && (
            <Article>
              <ArticleTitle>{showPost?.subject}</ArticleTitle>
              <ArticleExtra>
                <Space>
                  <Tag bordered={false}>
                    <Space size={4} align="center">
                      <Avatar src={showPost?.photoUrl} size={16} />
                      {showPost?.author}
                    </Space>
                  </Tag>
                  <Tag bordered={false}>{showPost?.dateline}</Tag>
                </Space>
              </ArticleExtra>

              <BBcodeRender
                code={showPost?.message || ""}
                parseOptions={{ replace }}
              />
            </Article>
          )}
        </ProCard>
      </Container>
    </>
  );
};

export default Component;
