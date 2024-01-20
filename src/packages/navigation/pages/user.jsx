import { createContext, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Row, Col, Pagination } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { styled } from "styled-components";
import { useUser } from "@hooks/user";
import { useRequest } from "ahooks";
import { GetProfile } from "@services/user";
import {
  GetBookmarkUserCollect,
  GetBookmarkUserOpenTeam,
  GetBookmarkUserJoinTeam,
} from "@services/bookmark";
import { Container } from "@components/Container";
import Team from "@components/Team";
import Favorite from "@components/Favorite";

const PAGE_SIZE = 16;

const UserContext = createContext({});

const FavoriteList = ({ list }) => {
  const navigate = useNavigate();

  return (
    <Row
      gutter={[
        { xs: 8, sm: 12, md: 18, lg: 20 },
        { xs: 4, sm: 8, md: 12, lg: 16 },
      ]}
    >
      {(list?.rows || []).map((item) => (
        <Col xs={24} sm={12} lg={8} key={item.id}>
          <Favorite
            title={item.title}
            name={item.userName}
            count={item.count}
            likeCount={item.likeNumber}
            avatar={item.photoUrl}
            onGo={() => navigate("../collect/" + item.id)}
          />
        </Col>
      ))}
    </Row>
  );
};

const TeamList = ({ list }) => {
  const navigate = useNavigate();

  return (
    <Row
      gutter={[
        { xs: 8, sm: 12, md: 18, lg: 20 },
        { xs: 4, sm: 8, md: 12, lg: 16 },
      ]}
    >
      {(list?.rows || []).map((item) => (
        <Col xs={12} lg={8} key={item.id}>
          <Team
            title={item.title}
            desc={item.description}
            thumb={item.iconUri}
            tags={item.tagVoList}
            name={item.userName}
            avatar={item.photoUrl}
            onGo={() => navigate("../team/" + item.id)}
          />
        </Col>
      ))}
    </Row>
  );
};

const JoinTeamView = () => {
  const { user } = useContext(UserContext);
  const pageNum = useRef(1);

  const { data: team, refresh: refreshJoinTeams } = useRequest(() =>
    GetBookmarkUserJoinTeam({
      userId: user.id,
      pageNum: pageNum.current,
      pageSize: PAGE_SIZE,
    })
  );
  return (
    <>
      <TeamList list={team} />
      <Pagination
        style={{ textAlign: "center", marginBlockStart: 32 }}
        defaultCurrent={pageNum.current}
        pageSize={PAGE_SIZE}
        total={team?.total}
        onChange={(current) => {
          pageNum.current = current;
          refreshJoinTeams();
        }}
      />
    </>
  );
};

const TeamView = () => {
  const { user } = useContext(UserContext);
  const pageNum = useRef(1);

  const { data: team, refresh: refreshUserTeams } = useRequest(() =>
    GetBookmarkUserOpenTeam({
      userId: user.id,
      pageNum: pageNum.current,
      pageSize: PAGE_SIZE,
    })
  );

  return (
    <>
      <TeamList list={team} />
      <Pagination
        style={{ textAlign: "center", marginBlockStart: 32 }}
        defaultCurrent={pageNum.current}
        pageSize={PAGE_SIZE}
        total={team?.total}
        onChange={(current) => {
          pageNum.current = current;
          refreshUserTeams();
        }}
      />
    </>
  );
};

const FavoriteView = () => {
  const { user } = useContext(UserContext);
  const pageNum = useRef(1);

  const { data: favorite, refresh: refreshUserFavorites } = useRequest(() =>
    GetBookmarkUserCollect({
      userId: user.id,
      pageNum: pageNum.current,
      pageSize: PAGE_SIZE,
    })
  );
  return (
    <>
      <FavoriteList list={favorite} />
      <Pagination
        style={{ textAlign: "center", marginBlockStart: 32 }}
        defaultCurrent={pageNum.current}
        pageSize={PAGE_SIZE}
        total={favorite?.total}
        onChange={(current) => {
          pageNum.current = current;
          refreshUserFavorites();
        }}
      />
    </>
  );
};

const UserInfo = styled.div`
  text-align: center;
`;

const NickName = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 16px;
  margin-top: 12px;
`;

const InfoCell = styled.div`
  display: flex;
  margin-top: 12px;
`;

const InfoCellItem = styled.div`
  flex: 1 0 0;
  width: 0;
`;

const InfoEditBtn = styled(Button)`
  margin-top: 12px;
`;

const InfoHeader = styled.h2`
  margin: 16px 0 8px 0;
  padding: 0;
  font-size: 20px;
`;

const InfoDesc = styled.p`
  margin: 0 0 6px 0;
  padding: 0;
  color: #5c5c5c;
`;

const ProfileInfo = ({ profile }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <>
      <UserInfo>
        <Avatar size={64} src={user.photoUrl} />
        <NickName>{user.username}</NickName>
        <InfoCell>
          <InfoCellItem>
            {profile?.befollow}
            <br />
            关注者
          </InfoCellItem>
          <InfoCellItem>
            {profile?.follow}
            <br />
            关注了
          </InfoCellItem>
        </InfoCell>
        <InfoEditBtn
          type="primary"
          block
          onClick={() => navigate("/user/info")}
        >
          编辑资料
        </InfoEditBtn>
      </UserInfo>
      <InfoHeader>简介</InfoHeader>
      <InfoDesc>
        创作{profile?.clCount}篇公开收藏集
        <br />
        获得{profile?.cllikeNumber}个赞
      </InfoDesc>
      <InfoDesc>
        创作{profile?.teamCount}篇公开团队
        <br />
        获得{profile?.teamlikeNumber}个赞
      </InfoDesc>
    </>
  );
};

const Component = () => {
  const { user } = useUser();
  const { data: profile } = useRequest(GetProfile, {
    defaultParams: [{ buserId: user.id }],
  });

  return (
    <Container $gutter={[0, 12]}>
      <UserContext.Provider value={{ user }}>
        <ProCard gutter={[24, 24]} wrap ghost>
          <ProCard colSpan={{ sm: 24, md: 8, lg: 6 }}>
            <ProfileInfo profile={profile} />
          </ProCard>
          <ProCard
            colSpan={{ sm: 24, md: 16, lg: 18 }}
            tabs={{
              destroyInactiveTabPane: true,
              items: [
                {
                  label: `收藏集`,
                  key: "tab1",
                  children: <FavoriteView />,
                },
                {
                  label: `公开团队`,
                  key: "tab2",
                  children: <TeamView />,
                },
                {
                  label: `加入团队`,
                  key: "tab3",
                  children: <JoinTeamView />,
                },
              ],
            }}
          />
        </ProCard>
      </UserContext.Provider>
    </Container>
  );
};

export default Component;
