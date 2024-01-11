import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  List,
  NavBar,
  SearchBar,
  Avatar,
  Space,
  InfiniteScroll,
} from "antd-mobile";
import { EyeOutline, ClockCircleOutline } from "antd-mobile-icons";
import { styled } from "styled-components";
import useSearchHistory, {
  saveSearchStore,
} from "@hooks/community/useSearchHistory";
import { useRequest } from "ahooks";
import { GetKeywordPosts } from "@package_community/services/post";
import Page from "@components/community/mini/Page";

const SearchRoot = styled.div`
  padding: 12px 16px;
`;
const SearchControl = styled(SearchBar)`
  --height: 36px;
  --border-radius: 18px;
`;

const Search = React.forwardRef(({ ...props }, ref) => {
  return (
    <SearchRoot>
      <SearchControl ref={ref} {...props} />
    </SearchRoot>
  );
});

const SearchHistoryTagRoot = styled.span`
  display: inline-block;
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 22px;
  color: #7e7e7e;
  background-color: #f5f5f5;
  padding: 0px 6px;
  border-radius: 2px;
`;

const SearchHistoryTag = ({ title, ...props }) => (
  <SearchHistoryTagRoot {...props} />
);

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

const PAGE_SIZE = 24;

const CONSTAVATARIMG =
  "http://6uzy.com/uc_server/avatar.php?uid=1&size=middle&ts=1";

const Component = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const word = searchParams.get("keyword");
  const keyword = decodeURIComponent(word || "");

  const { searchHistory } = useSearchHistory([keyword]);
  const [resultPage, setResultPage] = useState(word === null);
  const [searchWord, setSearchWord] = useState("");
  const [record, setRecord] = useState([]);
  const initialLoad = useRef(false);
  const searchRef = useRef();
  const pageNum = useRef(1);
  const { refreshAsync: refreshKeywordPost, data: posts } = useRequest(
    () =>
      GetKeywordPosts({
        pageNum: pageNum.current,
        pageSize: PAGE_SIZE,
        title: keyword,
      }),
    {
      onSuccess(res) {
        setRecord((record) => [...record, ...(res?.rows || [])]);
        pageNum.current += 1;
        initialLoad.current = true;
      },
      manual: true,
    }
  );

  const hasMore = posts?.total > PAGE_SIZE * pageNum.current;

  useEffect(() => {
    pageNum.current = 1;
    setSearchWord(keyword);
    setRecord([]);
  }, [keyword]);

  useEffect(() => {
    if (word === null) {
      searchRef.current?.focus();
    } else {
      setResultPage(true);
      refreshKeywordPost();
    }
  }, [word]);

  return (
    <>
      <NavBar onBack={() => history.back()}>
        {keyword
          ? `搜索到 ${record.length} 条有关 “${keyword}” 的结果`
          : "搜索"}
      </NavBar>
      <Search
        ref={searchRef}
        value={searchWord}
        placeholder="请输入帖子标题"
        onChange={setSearchWord}
        onFocus={() => setResultPage(false)}
        onBlur={() => initialLoad.current && setResultPage(true)}
        onSearch={(keyword) => {
          keyword.trim() && saveSearchStore([...searchHistory, keyword]);
          setSearchParams("keyword=" + keyword);
        }}
      />
      <Page yScroll style={{ position: "relative" }}>
        {resultPage ? (
          <>
            <List>
              {record.map((item) => (
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
            </List>
            <InfiniteScroll hasMore={hasMore} loadMore={refreshKeywordPost} />
          </>
        ) : (
          <div style={{ padding: "12px" }}>
            <p style={{ marginTop: 0 }}>搜索记录</p>
            <Space wrap>
              {searchHistory.map((item, index) => (
                <SearchHistoryTag
                  key={index}
                  onClick={() => setSearchParams("keyword=" + item)}
                >
                  {item}
                </SearchHistoryTag>
              ))}
            </Space>
          </div>
        )}
      </Page>
    </>
  );
};

export default Component;
