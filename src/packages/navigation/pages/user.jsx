import { useNavigate } from "react-router-dom";
import { Avatar, Button, Card, Image, Tag, Row, Col, Space } from "antd";
import {
  FolderOpenOutlined,
  PayCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
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

const TeamRoot = styled(Card)``;

const TeamCell = styled.div`
  min-height: 52px;
`;

const TeamThumb = styled(Image)`
  margin-bottom: 6px;
`;

const TeamTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 15px;
  color: #000;
`;

const TeamDesc = styled.p`
  margin: 0;
  padding: 0;
  color: #5f5f5f;
  font-size: 12px;
`;

const TeamTag = styled(Tag)`
  border: none;
  line-height: 18px;
  padding-inline: 4px;
  color: rgba(0, 0, 0, 0.48);
`;

const TeamInfo = styled.div``;

const TeamInfoItem = styled.span`
  color: #666;
  font-size: 12px;
`;

const TeamDate = styled.div`
  color: #666;
  font-size: 12px;
  text-align: right;
`;

const Team = ({ title, desc, thumb, tags, name, avatar, date }) => {
  return (
    <TeamRoot
      bodyStyle={{ display: "flex", flexDirection: "column", padding: 14 }}
    >
      <Row>
        <Col xs={{ md: 24, order: 2 }} md={{ span: 14, order: 1 }}>
          <TeamCell>
            <TeamTitle>{title}</TeamTitle>
            <TeamDesc>{desc}</TeamDesc>
            {tags.map((item, index) => (
              <TeamTag bordered={false} key={index}>
                {item}
              </TeamTag>
            ))}
          </TeamCell>
        </Col>
        <Col xs={{ md: 24, order: 1 }} md={{ span: 10, order: 2 }}>
          <TeamThumb width="100%" preview={false} src={thumb} />
        </Col>
      </Row>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col xs={24} md={12}>
          <TeamInfo>
            <Space size={6}>
              <Avatar size={14} src={avatar} />
              <TeamInfoItem>{name}</TeamInfoItem>
              <TeamInfoItem>0</TeamInfoItem>
              <TeamInfoItem>0</TeamInfoItem>
              <TeamInfoItem>0</TeamInfoItem>
            </Space>
          </TeamInfo>
        </Col>
        <Col xs={24} md={12}>
          <TeamDate>{date}</TeamDate>
        </Col>
      </Row>
    </TeamRoot>
  );
};

const CollectFolderRoot = styled(Card)``;

const CollectFolderName = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 15px;
  color: #000;
`;

const CollectFolderStat = styled.div`
  margin-top: 6px;
`;

const CollectFolderFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

const CollectFolderDate = styled.span`
  color: #666;
  font-size: 12px;
  text-align: right;
`;

const CollectFolder = ({
  title,
  avatar,
  date,
  cloneCount,
  viewCount,
  likeCount,
}) => {
  return (
    <CollectFolderRoot
      bodyStyle={{ display: "flex", flexDirection: "column", padding: 14 }}
    >
      <CollectFolderName>{title}</CollectFolderName>
      <CollectFolderStat>
        <Space>
          <span>
            <FolderOpenOutlined /> {cloneCount}
          </span>
          <span>
            <PayCircleOutlined /> {likeCount}
          </span>
          <span>
            <EyeOutlined /> {viewCount}
          </span>
        </Space>
      </CollectFolderStat>
      <CollectFolderFooter>
        <Avatar src={avatar} size={28} />
        <CollectFolderDate>{date}</CollectFolderDate>
      </CollectFolderFooter>
    </CollectFolderRoot>
  );
};

const CollectView = ({ userId }) => {
  const { data: collects } = useRequest(GetBookmarkUserCollect, {
    defaultParams: [
      {
        userId,
        pageNum: 1,
        pageSize: 10,
      },
    ],
  });

  return (
    <Row
      gutter={[
        { xs: 8, sm: 12, md: 18, lg: 20 },
        { xs: 4, sm: 8, md: 12, lg: 16 },
      ]}
    >
      {(collects?.rows || []).map((item) => (
        <Col xs={24} sm={12} lg={8}>
          <CollectFolder
            title={item.title}
            cloneCount={item.cloneNumber}
            likeCount={item.likeNumber}
            viewCount={item.viewNumber}
            avatar={item.photoUrl}
            date={item.createTime}
          />
        </Col>
      ))}
    </Row>
  );
};

const TeamView = ({ userId }) => {
  const { data: teams } = useRequest(GetBookmarkUserOpenTeam, {
    defaultParams: [
      {
        userId,
        pageNum: 1,
        pageSize: 10,
      },
    ],
  });

  return (
    <Row
      gutter={[
        { xs: 8, sm: 12, md: 18, lg: 20 },
        { xs: 4, sm: 8, md: 12, lg: 16 },
      ]}
    >
      {(teams?.rows || []).map((item) => (
        <Col xs={12} lg={8}>
          <Team
            title={item.title}
            desc={item.description}
            thumb={item.iconUri}
            tags={item.tagVoList.map((item) => item.tagName)}
            name={item.userName}
            avatar={item.photoUrl}
            date={item.createTime}
          />
        </Col>
      ))}
    </Row>
  );
};

const JoinTeamView = ({ userId }) => {
  const { data: teams } = useRequest(GetBookmarkUserJoinTeam, {
    defaultParams: [
      {
        userId,
        pageNum: 1,
        pageSize: 10,
      },
    ],
  });

  return (
    <Row
      gutter={[
        { xs: 8, sm: 12, md: 18, lg: 20 },
        { xs: 4, sm: 8, md: 12, lg: 16 },
      ]}
    >
      {(teams?.rows || []).map((item) => (
        <Col xs={12} lg={8}>
          <Team
            title={item.title}
            desc={item.description}
            thumb={item.iconUri}
            tags={item.tagVoList.map((item) => item.tagName)}
            name={item.userName}
            avatar={item.photoUrl}
            date={item.createTime}
          />
        </Col>
      ))}
    </Row>
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

const Component = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { data: profile } = useRequest(GetProfile, {
    defaultParams: [{ buserId: user?.id }],
  });

  return (
    <Container $gutter={[0, 12]}>
      <ProCard gutter={[24, 24]} wrap ghost>
        <ProCard colSpan={{ sm: 24, md: 8, lg: 6 }}>
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
        </ProCard>
        <ProCard
          colSpan={{ sm: 24, md: 16, lg: 18 }}
          tabs={{
            items: [
              {
                label: `收藏集`,
                key: "tab1",
                children: <CollectView userId={user.id} />,
              },
              {
                label: `公开团队`,
                key: "tab2",
                children: <TeamView userId={user.id} />,
              },
              {
                label: `加入团队`,
                key: "tab3",
                children: <JoinTeamView userId={user.id} />,
              },
            ],
          }}
        ></ProCard>
      </ProCard>
    </Container>
  );
};

export default Component;
