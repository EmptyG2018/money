import { useState, Fragment } from "react";
import { Checkbox, Image, Avatar, Modal } from "antd";
import { InboxOutlined, EyeOutlined } from "@ant-design/icons";
import styled, { css } from "styled-components";
import { fromNow } from "@utils/time";
import MarkdownEditor from "@uiw/react-markdown-editor";
import DefaultWebsite from "@/assets/default_website.svg";

const CardItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background-color: #fff;
  cursor: pointer;

  transition: transform 0.3s;
  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.06);
  }
`;

const FixedCheckBox = styled(Checkbox)`
  position: absolute;
  top: 4px;
  left: 8px;
  visibility: ${({ editable }) => (editable ? "visible" : "hidden")};
  ${CardItem}:hover & {
    visibility: visible;
  }
`;

const FixedAction = styled.div`
  position: absolute;
  display: flex;
  top: 12px;
  right: 12px;
  gap: 8px;
  visibility: hidden;
  ${CardItem}:hover & {
    visibility: ${({ editable }) => (editable ? "hidden" : "visible")};
  }
`;

const MarkTitle = styled.h2`
  padding: 16px;
  margin: 0;
  font-size: 15px;
  height: 56px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MarkContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  overflow: hidden;
`;

const MarkThumb = styled(Image)`
  max-width: 100%;
  object-fit: cover;
`;

const MarkFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`;

const MarkLocation = styled.div`
  box-sizing: border-box;
  font-size: 13px;
  width: 100%;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #555;
`;

const MarkExtra = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  height: 18px;
  color: #7a7a7a;
`;

const CardMark = ({ location, date, watch, children, ...props }) => {
  return (
    <CardItem {...props}>
      {children}
      <MarkFooter>
        <MarkLocation>
          <InboxOutlined style={{ fontSize: 18 }} />
          &nbsp;{location}
        </MarkLocation>
        <MarkExtra>
          <span>收藏于{fromNow(date)}</span>
          <span>
            <EyeOutlined />
            &nbsp;{watch}
          </span>
        </MarkExtra>
      </MarkFooter>
    </CardItem>
  );
};

export const Mark = ({ title, icon, thumb, url, ...props }) => {
  return (
    <CardMark onClick={() => window.open(url)} {...props}>
      <MarkTitle>
        {!!icon && <Avatar size={18} src={icon} />}
        {title}
      </MarkTitle>
      <MarkContent>
        <MarkThumb fallback={DefaultWebsite} src={thumb} preview={false} />
      </MarkContent>
    </CardMark>
  );
};

Mark.Compact = ({ title, icon, thumb, ...props }) => (
  <CardMark {...props}>
    <MarkTitle>
      {!!icon && <Avatar size={18} src={icon} />}
      {title}
    </MarkTitle>
    <MarkThumb src={thumb} preview={false} />
  </CardMark>
);

const ImgMarkContent = styled.div`
  width: 100%;
  height: 236px;
  overflow: hidden;
`;
const ImgMarkThumb = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImgMark = ({ thumb, ...props }) => {
  const [previewShow, setPreviewShow] = useState(false);
  return (
    <>
      <CardMark onClick={() => setPreviewShow(true)} {...props}>
        <ImgMarkContent>
          <ImgMarkThumb src={thumb} />
        </ImgMarkContent>
      </CardMark>

      <ImgMark.Preview
        visible={previewShow}
        src={thumb}
        onVisibleChange={() => {
          setPreviewShow(false);
        }}
      />
    </>
  );
};

ImgMark.Compact = ({ thumb, ...props }) => (
  <CardMark {...props}>
    <ImgMarkThumb src={thumb} />
  </CardMark>
);

const ImgMarkPreview = styled.span`
  position: fixed;
  left: -999px;
  top: -999px;
  width: 0;
  height: 0;
  overflow: hidden;
  display: none;
  visibility: hidden;
  z-index: -9999;
`;

ImgMark.Preview = ({ ...props }) => (
  <ImgMarkPreview>
    <Image
      preview={{
        destroyOnClose: true,
        ...props,
      }}
    />
  </ImgMarkPreview>
);

const WordMarkContent = styled(MarkdownEditor.Markdown)`
  padding-inline: 16px;
  height: 180px;
  overflow: hidden;
  ${({ compact }) =>
    compact &&
    css`
      height: auto;
      max-height: 600px;
    `}
`;

export const WordMark = ({ title, word, ...props }) => {
  const [previewShow, setPreviewShow] = useState(false);
  return (
    <>
      <CardMark onClick={() => setPreviewShow(true)} {...props}>
        <MarkTitle>{title}</MarkTitle>
        <WordMarkContent source={word} />
      </CardMark>

      <WordMark.Preview
        open={previewShow}
        title={title}
        word={word}
        onCancel={() => setPreviewShow(false)}
      />
    </>
  );
};

WordMark.Compact = ({ title, word, ...props }) => (
  <CardMark {...props}>
    <MarkTitle>{title}</MarkTitle>
    <WordMarkContent compact source={word} />
  </CardMark>
);

WordMark.Preview = ({ word, ...props }) => (
  <Modal width={760} destroyOnClose footer={null} {...props}>
    <MarkdownEditor.Markdown
      style={{ minHeight: 360, maxHeight: 600, overflowY: "auto" }}
      source={word}
    />
  </Modal>
);

const CellMarkRoot = styled(CardItem)`
  position: relative;
  display: flex;
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
`;

const CellMarkCell = styled.div`
  margin-inline-start: 16px;
`;

export const MarkList = ({
  checked,
  isThumbLarge,
  title,
  thumb,
  desc,
  website,
  date,
  actions = [],
  onCheckChange,
  ...props
}) => {
  return (
    <CellMarkRoot checked={checked} {...props}>
      {isThumbLarge ? (
        <img width={56} src={thumb} />
      ) : (
        <img width={20} height={20} src={thumb} />
      )}
      <CellMarkCell>
        <MarkTitle>{title}</MarkTitle>
        <MarkDesc>{desc}</MarkDesc>
        <MarkExtra>
          <span>{website}</span>·<span>{date}</span>
        </MarkExtra>
      </CellMarkCell>
      <FixedCheckBox checked={checked} onChange={onCheckChange} />
      <FixedAction>
        {actions.map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
      </FixedAction>
    </CellMarkRoot>
  );
};
