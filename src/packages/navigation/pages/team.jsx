import { useState, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { App, Avatar, Button, Space, Tabs, Typography, Pagination } from "antd";
import {
  UserOutlined,
  StarOutlined,
  StarFilled,
  LikeFilled,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  GetMarkeTeamInfo,
  JoinMarkeTeam,
  UpdateLogoutTeam,
  UpdateMarkeTeamLike,
  UpdateMarkeTeamCollection,
} from "@services/collection/team";
import { GetMarkeTeamMarks } from "@services/collection/mark";
import { Container } from "@components/Container";
import { Mark, ImgMark, WordMark } from "@components/Mark";
import AuthNavigator from "@components/AuthNavigator";
import NoData from "@components/NoData";
import styled from "styled-components";

const PAGE_SIZE = 16;

const TeamRenderView = styled.div`
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

const TeamDataView = ({ activeKey }) => {
  const pageNum = useRef(1);
  const params = useParams();

  const { data: mark, refresh: refreshMarks } = useRequest(
    () =>
      GetMarkeTeamMarks({
        id: params.id,
        classId: activeKey,
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
          <TeamRenderView>
            <MarkLayout>
              {(mark?.rows || []).map((item) => (
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
          </TeamRenderView>

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

const TeamList = ({ categorys }) => {
  const [activeKey, setActiveKey] = useState("");
  return (
    <>
      <CategoryBar>
        <Container $gutter={[16, 0]}>
          <TabBar
            activeKey={activeKey}
            items={[
              {
                key: "",
                label: "全部",
              },
              ...categorys.map((item) => ({
                key: item.id,
                label: item.title,
              })),
            ]}
            onChange={setActiveKey}
          />
        </Container>
      </CategoryBar>
      <TeamDataView activeKey={activeKey} />
    </>
  );
};

const TeamPanelRoot = styled.div`
  background-color: #fff;
  padding-block: 24px;
`;

const TeamInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TeamInfoCell = styled.div`
  display: flex;
  gap: 16px;
  flex: 1 0 0;
`;

const TeamInfoTypography = styled.div`
  width: 0;
  flex: 1 0 0;
`;

const TeamInfoTitle = styled(Typography.Title)`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 360px;
`;

const TeamInfoDesc = styled(Typography.Text)`
  max-width: 480px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  margin-bottom: 8px;
`;

const TeamInfoUser = styled.span`
  padding: 2px 6px;
  border-radius: 32px;
  font-size: 12px;
  color: #666;
  background-color: #ededed;
`;

const TeamInfoAction = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const TeamPanel = ({ info, onJoin, onCollection, onLike }) => {
  const app = App.useApp();

  const { run: joinMarkeTeam } = useRequest(
    () => JoinMarkeTeam({ teamId: info.id }),
    {
      manual: true,
      onSuccess() {
        onJoin && onJoin();
      },
      onError(err) {
        app.message.error(err.message);
      },
    }
  );

  const { run: logoutTeam } = useRequest(
    () => UpdateLogoutTeam({ teamId: info.id }),
    {
      manual: true,
      onSuccess() {
        onJoin && onJoin();
      },
      onError(err) {
        app.message.error(err.message);
      },
    }
  );

  const { run: collectionTeam } = useRequest(
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

  const { run: likeTeam } = useRequest(
    () => UpdateMarkeTeamLike({ id: info.id }),
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
    <TeamPanelRoot>
      <Container $gutter={[16, 0]}>
        {info && (
          <>
            <TeamInfo>
              <TeamInfoCell>
                <Avatar src={info.iconUri} size={96} />
                <TeamInfoTypography>
                  <TeamInfoTitle level={3}>{info.title}</TeamInfoTitle>
                  <TeamInfoDesc type="secondary">
                    {info.description}
                  </TeamInfoDesc>
                  <TeamInfoUser>
                    <UserOutlined /> {info.userName}
                  </TeamInfoUser>
                </TeamInfoTypography>
              </TeamInfoCell>
              <TeamInfoAction>
                <Space>
                  <AuthNavigator>
                    {info.isjoin === 0 && (
                      <Button type="primary" onClick={() => joinMarkeTeam()}>
                        加入团队
                      </Button>
                    )}
                    {info.isjoin === 1 && (
                      <Button onClick={() => logoutTeam()}>离开团队</Button>
                    )}
                  </AuthNavigator>
                  <AuthNavigator>
                    {info.isLike === 0 && (
                      <Button
                        type="text"
                        icon={<StarOutlined />}
                        onClick={() => collectionTeam()}
                      >
                        收藏
                      </Button>
                    )}
                    {info.isLike === 1 && (
                      <Button
                        type="link"
                        icon={<StarFilled />}
                        onClick={() => collectionTeam()}
                      >
                        已收藏
                      </Button>
                    )}
                  </AuthNavigator>
                  <AuthNavigator>
                    <Button
                      type="link"
                      icon={<LikeFilled />}
                      onClick={() => likeTeam()}
                    >
                      {""}
                      {info.likeNumber}
                    </Button>
                  </AuthNavigator>
                </Space>
              </TeamInfoAction>
            </TeamInfo>
          </>
        )}
      </Container>
    </TeamPanelRoot>
  );
};

const Component = () => {
  const params = useParams();
  const { mutate, data: team } = useRequest(GetMarkeTeamInfo, {
    defaultParams: [{ id: params.id }],
  });

  return (
    !!team && (
      <>
        <TeamPanel
          info={team.teamInfo}
          onJoin={() => {
            mutate({
              ...team,
              teamInfo: {
                ...team.teamInfo,
                isjoin: team.teamInfo.isjoin === 1 ? 0 : 1,
              },
            });
          }}
          onCollection={() => {
            mutate({
              ...team,
              teamInfo: {
                ...team.teamInfo,
                isLike: team.teamInfo.isLike === 1 ? 0 : 1,
              },
            });
          }}
          onLike={() =>
            mutate({
              ...team,
              teamInfo: {
                ...team.teamInfo,
                likeNumber: team.teamInfo.likeNumber + 1,
              },
            })
          }
        />
        <TeamList categorys={team.teamTag} />
      </>
    )
  );
};

export default Component;
