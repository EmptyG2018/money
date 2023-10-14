import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar, Image, Space, Tag, Avatar } from "antd-mobile";
import { LinkOutline, DownCircleOutline, LockFill } from "antd-mobile-icons";
import { useRequest } from "ahooks";
import { useUser } from "../../../hooks/user";
import {
  GetPostContent,
  GetPostHideContent,
} from "../../../services/community/post";
import { styled } from "styled-components";
import Page from "../../../components/community/mini/Page";
import Byte from "../../../components/Byte";
import BBcodeRender from "../../../components/BBCodeRender";
import DownloadFile from "../../../components/community/mini/DownloadFile";

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
  font-size: 20px;
`;

const ArticleExtra = styled(Space)`
  margin-bottom: 16px;
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
  const { user } = useUser();
  const params = useParams();
  const { data: post, error: postError } = useRequest(GetPostContent, {
    defaultParams: [{ tid: params.id }],
  });
  const {
    run: getHidePost,
    data: hidePost,
    error: hidePostError,
  } = useRequest(GetPostHideContent, {
    manual: true,
  });

  useEffect(() => {
    post?.readRole === 1 && getHidePost({ tid: params.id });
  }, [post]);

  const showPost = post?.readRole === 1 ? hidePost : post;

  const showError = hidePostError || postError;

  const replace = (node) => {
    if (node.attribs?.["data-type"] === "hide") {
      const content = deepNodeTree(node?.children);
      return (
        <div style={{ marginBlock: 16 }}>
          {user ? (
            showPost.readRole === 0 ? (
              <LockTip>
                <LockFill /> 此处内容已隐藏，开通会员可查看
              </LockTip>
            ) : (
              <UnLockContent>
                <UnLockContentHeader>本帖隐藏内容</UnLockContentHeader>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
              </UnLockContent>
            )
          ) : (
            <LockTip>
              <LockFill /> 此处内容已隐藏，请登录后查看权益
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
            <Image src={attachment} width="100%" height="auto" lazy />
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
              <Image src={attachment} width="100%" height="auto" lazy />
            ) : (
              <DownloadFile
                name={filename}
                size={<Byte byte={filesize} />}
                count={100203}
                state={!user || showPost.downRole === 0 ? "warning" : "primary"}
              >
                {user ? (
                  showPost.downRole === 0 ? (
                    <>
                      <LinkOutline /> 购买会员可下载附件
                    </>
                  ) : (
                    <>
                      <DownCircleOutline /> 立即下载附件
                    </>
                  )
                ) : (
                  <>
                    <LinkOutline /> 请登录后查看权益
                  </>
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
      <NavBar onBack={() => history.back()}>{showPost?.subject}</NavBar>
      <Page yScroll gutter={[16]}>
        {showError && (
          <div style={{ textAlign: "center", padding: "16px" }}>
            {showError?.message}
          </div>
        )}
        {showPost && (
          <Article>
            <ArticleTitle>{showPost.subject}</ArticleTitle>
            <ArticleExtra block>
              <Tag round color="#f0f0f0" style={{ "--text-color": "#707070" }}>
                <Space style={{ "--gap": "2px" }} align="center">
                  <Avatar
                    src={showPost.photoUrl}
                    style={{ "--size": "12px", "--border-radius": "6px" }}
                  />
                  {showPost.author}
                </Space>
              </Tag>
              <Tag round color="#f0f0f0" style={{ "--text-color": "#707070" }}>
                {showPost.dateline}
              </Tag>
            </ArticleExtra>
            <BBcodeRender
              code={showPost.message || ""}
              parseOptions={{ replace }}
            />
          </Article>
        )}
      </Page>
    </>
  );
};

export default Component;
