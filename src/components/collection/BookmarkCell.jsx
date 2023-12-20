import { styled } from "styled-components";

const ComponentRoot = styled.div`
  display: flex;
  grid-gap: 16px;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const BookmarkCell = styled.div``;

const BookmarkTitle = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 15px;
`;

const BookmarkDesc = styled.p`
  padding: 0;
  margin: 2px 0 0 0;
  color: #4d4d4d;
  font-size: 14px;
  line-height: 1.5;
  line-clamp: 5;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  overflow: clip;
  white-space: pre;
  white-space: pre-wrap;
`;

const BookmarkExtra = styled.div`
  display: flex;
  gap: 8px;
  color: grey;
  font-size: 13px;
  margin-top: 2px;
`;

const Component = ({
  thumb,
  thumbWidth,
  thumbHeight,
  title,
  desc,
  website,
  date,
}) => {
  return (
    <ComponentRoot>
      <img width={thumbWidth} height={thumbHeight} src={thumb} />
      <BookmarkCell>
        <BookmarkTitle>{title}</BookmarkTitle>
        <BookmarkDesc>{desc}</BookmarkDesc>
        <BookmarkExtra>
          <span>{website}</span>·<span>{date}</span>
        </BookmarkExtra>
      </BookmarkCell>
    </ComponentRoot>
  );
};

export default Component;
