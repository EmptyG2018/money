import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { GetPostContent } from "../../services/community/post";
import { styled } from "styled-components";
import { Avatar, Tag, Image, Space } from "antd";
import Byte from "../../components/Byte";
import BBcodeRender from "../../components/BBCodeRender";
import DownloadFile from "../../components/community/DownloadFile";
import Container from "../../components/Container";
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

const HideContent = ({ content }) => {
  return (
    <div style={{ padding: "12px 24px", border: "1px dashed #ff9500" }}>
      <div
        style={{ textAlign: "center", lineHeight: "24px", marginBottom: "8px" }}
      >
        本帖隐藏内容
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

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

const Component = () => {
  const params = useParams();
  const { data: postContent, error } = useRequest(GetPostContent, {
    defaultParams: [{ tid: params.id }],
  });

  const replace = (node) => {
    if (node.attribs?.["data-type"] === "hide") {
      const content = deepNodeTree(node?.children);
      return (
        <div style={{ marginBlock: 16 }}>
          <HideContent content={content} />
        </div>
      );
    }
    if (node.attribs?.["data-type"] === "attachimg") {
      const aId = node.attribs?.["data-value"];
      const { aid, isimage, attachment } =
        postContent.list.find((item) => item.aid === +aId) || {};
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
        postContent.list.find((item) => item.aid === +aId) || {};
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
                disabled={postContent.downRole === 0}
              >
                {postContent.downRole === 0 ? "权限不足，无法下载" : "立即下载"}
              </DownloadFile>
            )}
          </div>
        )
      );
    }
  };

  return (
    <Container title={false} gutter={[16, 24]}>
      <ProCard>
        {error && (
          <div style={{ textAlign: "center", padding: "16px" }}>
            {error?.message}
          </div>
        )}
        {postContent && (
          <Article>
            <ArticleTitle>{postContent?.subject}</ArticleTitle>
            <ArticleExtra>
              <Space>
                <Tag bordered={false}>
                  <Space size={4} align="center">
                    <Avatar src={postContent?.photoUrl} size={16} />
                    {postContent?.author}
                  </Space>
                </Tag>
                <Tag bordered={false}>{postContent?.dateline}</Tag>
              </Space>
            </ArticleExtra>

            <BBcodeRender
              code={postContent?.message || ""}
              parseOptions={{ replace }}
            />
          </Article>
        )}
      </ProCard>
    </Container>
  );
};

export default Component;
