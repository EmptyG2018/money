import { useState, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { App, Button, Space, Tabs, Typography, Pagination } from "antd";
import {
  UserOutlined,
  StarOutlined,
  StarFilled,
  LikeFilled,
} from "@ant-design/icons";
import { useRequest,useTitle } from "ahooks";
import {
  GetMarkeFavoriteInfo,
  CloneMarkeFavorite,
  UpdateMarkeFavoriteLike,
  UpdateMarkeTeamCollection,
} from "@services/favorite";
import { GetMarkeFavoriteMarks } from "@services/collection/mark";
import { Container } from "@components/Container";
import { Mark, ImgMark, WordMark } from "@components/Mark";
import AuthNavigator from "@components/AuthNavigator";
import NoData from "@components/NoData";
import styled from "styled-components";

const PAGE_SIZE = 16;

const FavoriteRenderView = styled.div`
  min-height: 520px;
`;

const MarkLayout = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(calc(50% - 32px), 254px), 1fr)
  );
  grid-template-rows: 1fr;
  padding: 16px;
`;

const FavoriteDataView = ({ activeKey }) => {
  const params = useParams();
  const pageNum = useRef(1);

  const { data: mark, refresh: refreshMarks } = useRequest(
    () =>
      GetMarkeFavoriteMarks({
        pid: activeKey,
        id:  params.id,
        pageNum: pageNum.current,
        pageSize: PAGE_SIZE,
      }),
    {
      refreshDeps: [activeKey],
      refreshDepsAction: () => {
        pageNum.current = 1;
        refreshMarks();
      },
    }
  );

  return (
    <Container>
      {mark?.rows.length ? (
        <>
          <FavoriteRenderView>
            <MarkLayout>
              {(mark.rows || []).map((item) => (
                <Fragment key={item.id}>
                  {item.mediaType === 0 && (
                    <Mark
                      url={item.domain}
                      title={item.title}
                      icon={item.icon}
                      thumb={item.imageUrl}
                      location={item.collectionsTitle}
                      date={item.createTime}
                      watch={item.count}
                    />
                  )}
                  {item.mediaType === 1 && (
                    <ImgMark
                      thumb={item.domain}
                      location={item.collectionsTitle}
                      date={item.createTime}
                    />
                  )}
                  {item.mediaType === 2 && (
                    <WordMark
                      title={item.title}
                      word={item.description}
                      location={item.collectionsTitle}
                      date={item.createTime}
                    />
                  )}
                </Fragment>
              ))}
            </MarkLayout>
          </FavoriteRenderView>

          <Pagination
            style={{ textAlign: "center" }}
            current={pageNum.current}
            pageSize={PAGE_SIZE}
            onChange={(current) => {
              pageNum.current = current;
              refreshMarks();
            }}
            total={mark?.total || 0}
            showSizeChanger={false}
          />
        </>
      ) : (
        <NoData />
      )}
    </Container>
  );
};

const CategoryBar = styled.div`
  background-color: #fff;
`;
const TabBar = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: none;
  }
`;

const FavoriteList = ({ categorys }) => {
  const [activeKey, setActiveKey] = useState("" + categorys[0].id);

  return (
    <>
      <CategoryBar>
        <Container $gutter={[16, 0]}>
          <TabBar
            activeKey={activeKey}
            items={[
              ...categorys.map((item) => ({
                key: "" + item.id,
                label: item.title,
              })),
            ]}
            onChange={setActiveKey}
          />
        </Container>
      </CategoryBar>
      <FavoriteDataView activeKey={activeKey} />
    </>
  );
};

const FavoritePanelRoot = styled.div`
  background-color: #fff;
  padding-block: 24px;
`;

const FavoriteInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FavoriteInfoCell = styled.div`
  display: flex;
  gap: 16px;
  flex: 1 0 0;
`;

const FavoriteInfoTypography = styled.div`
  width: 0;
  flex: 1 0 0;
`;

// const FavoriteInfoTitle = styled(Typography.Title)`
//   margin: 0;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   max-width: 360px;
// `;

const FavoriteInfoTitle = ({ title }) => {
    useTitle(title);
    return <ArticleTitleRoot>{title}</ArticleTitleRoot>;
};

const FavoriteInfoUser = styled.span`
  padding: 2px 6px;
  border-radius: 32px;
  font-size: 12px;
  color: #666;
  background-color: #ededed;
`;

const FavoriteInfoAction = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const ArticleTitleRoot = styled.h1`
  font-size: 22px;
  font-weight: 600;
`;


const FavoritePanel = ({ info, onClone, onCollection, onLike }) => {
  const app = App.useApp();
  const { run: cloneMarkeFavorite } = useRequest(
    () => CloneMarkeFavorite({ id: info.id }),
    {
      manual: true,
      onSuccess() {
        onClone && onClone();
      },
      onError(err) {
        app.message.error(err.message);
      },
    }
  );

  const { run: collectionFavorite } = useRequest(
    () => UpdateMarkeTeamCollection({ id: info.id }),
    {
      manual: true,
      onSuccess() {
        onCollection && onCollection();
      },
      onError(err) {
        app.message.error(err.message);
      },
    }
  );

  const { run: likeFavorite } = useRequest(
    () => UpdateMarkeFavoriteLike({ id: info.id }),
    {
      manual: true,
      onSuccess() {
        onLike && onLike();
      },
      onError(err) {
        app.message.error(err.message);
      },
    }
  );

  return (
    <FavoritePanelRoot>
      <Container $gutter={[16, 0]}>
        {info && (
          <>
            <FavoriteInfo>
              <FavoriteInfoCell>
                <FavoriteInfoTypography>
                  <FavoriteInfoTitle level={3} title={info.title} style="margin: 0;overflow: hidden;   text-overflow: ellipsis;   white-space: nowrap;   max-width: 360px;">{info.title}</FavoriteInfoTitle>
                  <FavoriteInfoUser>
                    <UserOutlined /> {info.userName}
                  </FavoriteInfoUser>
                </FavoriteInfoTypography>
              </FavoriteInfoCell>
              <FavoriteInfoAction>
                <Space>
                  <AuthNavigator>
                    <Button type="primary" onClick={() => cloneMarkeFavorite()}>
                      克隆 {info.cloneNumber}
                    </Button>
                  </AuthNavigator>
                  <AuthNavigator>
                    {info.isLike === 0 && (
                      <Button
                        type="text"
                        icon={<StarOutlined />}
                        onClick={() => collectionFavorite()}
                      >
                        收藏
                      </Button>
                    )}
                    {info.isLike === 1 && (
                      <Button
                        type="link"
                        icon={<StarFilled />}
                        onClick={() => collectionFavorite()}
                      >
                        已收藏
                      </Button>
                    )}
                  </AuthNavigator>
                  <AuthNavigator>
                    <Button
                      type="link"
                      icon={<LikeFilled />}
                      onClick={() => likeFavorite()}
                    >
                      {""}
                      {info.likeNumber}
                    </Button>
                  </AuthNavigator>
                </Space>
              </FavoriteInfoAction>
            </FavoriteInfo>
          </>
        )}
      </Container>
    </FavoritePanelRoot>
  );
};

const Component = () => {
  const params = useParams();
  const { mutate, data: favorite } = useRequest(GetMarkeFavoriteInfo, {
    defaultParams: [{ id: params.id }],
  });

  return (
    !!favorite && (
      <>
        <FavoritePanel
          info={favorite.collectionInfo}
          onClone={() =>
            mutate({
              ...favorite,
              collectionInfo: {
                ...favorite.collectionInfo,
                cloneNumber: favorite.collectionInfo.cloneNumber + 1,
              },
            })
          }
          onCollection={() => {
            mutate({
              ...favorite,
              collectionInfo: {
                ...favorite.collectionInfo,
                isLike: favorite.collectionInfo.isLike === 1 ? 0 : 1,
              },
            });
          }}
          onLike={() =>
            mutate({
              ...favorite,
              collectionInfo: {
                ...favorite.collectionInfo,
                likeNumber: favorite.collectionInfo.likeNumber + 1,
              },
            })
          }
        />
        <FavoriteList categorys={favorite.collectionTag} />
      </>
    )
  );
};

export default Component;
