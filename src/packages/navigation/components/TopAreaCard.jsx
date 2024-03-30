import { useNavigate } from 'react-router-dom';
import { Tabs, Row, Col, Image, Tag, Space, Avatar } from 'antd';
import { useRequest } from 'ahooks';
import {
  GetBookmarkPromotionMarketCollects,
  GetBookmarkPromotionMarketTeams,
  GetBookmarkPromotionMarketCollectParticipants,
} from '@services/bookmark';
import Favorite from '@components/Favorite';
import Team from '@components/Team';
import styled from 'styled-components';

const Extension = styled.div`
  width: 100%;
`;

const ExtensionTabs = styled(Tabs)`
  &.ant-tabs-left .ant-tabs-tabpane {
    padding-left: 0 !important;
  }
`;

const ExtensionCard = styled.div`
  background-color: #fff;
  height: 304px;
  border-radius: 8px;
  overflow: hidden;
`;

const ExtensionContent = styled.div`
  box-sizing: border-box;
  padding: 16px;
  height: 304px;
  overflow-y: auto;
`;

const ExtensionLabel = styled.span`
  font-size: 12px;
  color: #5f5f5f;
`;

const ExtensionGrid = ({ records, children }) => {
  return (
    <Row
      gutter={[
        { xs: 8, sm: 12 },
        { xs: 8, sm: 12 },
      ]}
    >
      {records.map((item, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          {children && children(item)}
        </Col>
      ))}
    </Row>
  );
};

const FavoriteList = ({ sort }) => {
  const navigate = useNavigate();
  const { data: favorite } = useRequest(GetBookmarkPromotionMarketCollects, {
    defaultParams: [
      {
        orderSort: sort,
      },
    ],
  });

  return (
    <ExtensionContent>
      <ExtensionGrid records={favorite?.rows || []}>
        {(item) => (
          <Favorite
            key={item.id}
            title={item.title}
            name={item.userName}
            avatar={item.photoUrl}
            count={item.count}
            likeCount={item.likeNumber}
            viewNumber={item.viewNumber}
            onGo={() => navigate('./collect/' + item.id)}
          />
        )}
      </ExtensionGrid>
    </ExtensionContent>
  );
};

const TeamList = ({ sort }) => {
  const navigate = useNavigate();
  const { data: team } = useRequest(GetBookmarkPromotionMarketTeams, {
    defaultParams: [
      {
        orderSort: sort,
      },
    ],
  });

  return (
    <ExtensionContent>
      <ExtensionGrid records={team?.rows || []}>
        {(item) => (
          <Team
            key={item.id}
            title={item.title}
            desc={item.description}
            thumb={item.iconUri}
            tags={item.tagVoList}
            name={item.userName}
            avatar={item.photoUrl}
            onGo={() => navigate('./team/' + item.id)}
          />
        )}
      </ExtensionGrid>
    </ExtensionContent>
  );
};

const UserList = () => {
  const { data: teams } = useRequest(
    GetBookmarkPromotionMarketCollectParticipants
  );

  return (
    <ExtensionCard>
      <ExtensionContent>
        <Space wrap>
          {(teams?.rows || []).map((item) => (
            <Tag
              style={{ cursor: 'pointer' }}
              bordered={false}
              color="processing"
              icon={<Avatar src={item.photoUrl} size={16} />}
              key={item.id}
            >
              &nbsp;{item.userName}
            </Tag>
          ))}
        </Space>
      </ExtensionContent>
    </ExtensionCard>
  );
};

const TabItem = ({ src, title }) => (
  <>
    <Image src={src} width={30} height={30} preview={false} />
    <br />
    <ExtensionLabel>{title}</ExtensionLabel>
  </>
);

const TopAreaCard = () => {
  return (
    <Extension>
      <Row gutter={16}>
        <Col xs={24} md={18} lg={20}>
          <ExtensionCard>
            <ExtensionTabs
              tabBarGutter={0}
              tabPosition="left"
              renderTabBar={(props, DefaultTabbar) => (
                <div style={{ paddingBlock: '16px' }}>
                  <DefaultTabbar {...props} />
                </div>
              )}
              items={[
                {
                  key: '1',
                  label: <TabItem src="./imgs/nav/1.png" title="最新云夹" />,
                  children: <FavoriteList sort="new" />,
                },
                {
                  key: '2',
                  label: <TabItem src="./imgs/nav/2.png" title="最新团队" />,
                  children: <TeamList sort="new" />,
                },
                {
                  key: '3',
                  label: <TabItem src="./imgs/nav/3.png" title="热门云夹" />,
                  children: <FavoriteList sort="up" />,
                },
                {
                  key: '4',
                  label: <TabItem src="./imgs/nav/4.png" title="热门团队" />,
                  children: <TeamList sort="up" />,
                },
              ]}
            />
          </ExtensionCard>
        </Col>
        <Col xs={0} md={6} lg={4}>
          <UserList />
        </Col>
      </Row>
    </Extension>
  );
};

export default TopAreaCard;
