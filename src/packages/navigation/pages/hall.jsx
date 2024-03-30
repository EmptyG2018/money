import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Row, Col, Pagination } from 'antd';
import { useRequest } from 'ahooks';
import {
  GetBookmarkMarketCategorys,
  GetBookmarkMarketCollects,
  GetBookmarkMarketTeams,
} from '@services/bookmark';
import { Container } from '@components/Container';
import Team from '@components/Team';
import Favorite from '@components/Favorite';
import NoData from '@components/NoData';
import styled from 'styled-components';

const PAGE_SIZE = 16;

const InitialGroupkey = 'collect';

const GroupCategorys = [
  { key: 'collect', label: '收藏集' },
  { key: 'team', label: '优秀团队' },
];

const View = styled.div`
  min-height: 520px;
  padding-block: 16px;
`;

const TeamView = ({ classId }) => {
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const { data: bookmarkTeam } = useRequest(
    () =>
      GetBookmarkMarketTeams({
        classId,
        pageNum,
        pageSize: PAGE_SIZE,
        searchKey: '',
      }),
    { refreshDeps: [classId, pageNum] }
  );

  return (
    <>
      {bookmarkTeam?.rows.length ? (
        <>
          <View>
            <Row
              gutter={[
                { xs: 8, sm: 12, md: 18, lg: 20 },
                { xs: 4, sm: 8, md: 12, lg: 16 },
              ]}
            >
              {(bookmarkTeam.rows || []).map((item) => (
                <Col xs={12} sm={8} lg={6} key={item.id}>
                  <Team
                    key={item.id}
                    title={item.title}
                    desc={item.description}
                    thumb={item.iconUri}
                    tags={item.tagVoList}
                    name={item.userName}
                    avatar={item.photoUrl}
                    onGo={() => navigate('../team/' + item.id)}
                  />
                </Col>
              ))}
            </Row>
          </View>
          <Pagination
            style={{ textAlign: 'center', marginBlockStart: 32 }}
            current={pageNum}
            pageSize={PAGE_SIZE}
            onChange={setPageNum}
            total={bookmarkTeam?.total || 0}
            showSizeChanger={false}
          />
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

const CollectView = ({ classId }) => {
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const { data: bookmarkCollect } = useRequest(
    () =>
      GetBookmarkMarketCollects({
        classId,
        pageNum,
        pageSize: PAGE_SIZE,
        searchKey: '',
      }),
    { refreshDeps: [classId, pageNum] }
  );

  return (
    <>
      {bookmarkCollect?.rows.length ? (
        <>
          <View>
            <Row
              gutter={[
                { xs: 8, sm: 12, md: 18, lg: 20 },
                { xs: 4, sm: 8, md: 12, lg: 16 },
              ]}
            >
              {(bookmarkCollect?.rows || []).map((item) => (
                <Col xs={12} sm={8} lg={6} key={item.id}>
                  <Favorite
                    key={item.id}
                    title={item.title}
                    name={item.userName}
                    count={item.count}
                    likeCount={item.likeNumber}
                    viewNumber={item.viewNumber}
                    avatar={item.photoUrl}
                    onGo={() => navigate('../collect/' + item.id)}
                  />
                </Col>
              ))}
            </Row>
          </View>
          <Pagination
            style={{ textAlign: 'center' }}
            current={pageNum}
            pageSize={PAGE_SIZE}
            onChange={setPageNum}
            total={bookmarkCollect?.total || 0}
            showSizeChanger={false}
          />
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

const CategoryContainer = styled.div`
  background-color: #fff;
`;

const CategoryBar = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: none;
  }
`;

const ChildCategoryBar = styled(CategoryBar)`
  .ant-tabs-tab-btn {
    color: #5f5f5f;
  }
  .ant-tabs-ink-bar {
    background: none;
  }
`;

/**
 * @title 子级分类
 * @param {string} activeKey 当前分类key
 * @param {array} items
 */
const ChildCategory = ({ activeKey, items, onActiveKeyChange }) => {
  const ConstCategory = { key: '全部', key: '' };
  const categorys = items?.length
    ? [
        ConstCategory,
        ...items.map((item) => ({
          label: item.title,
          key: item.id,
        })),
      ]
    : [ConstCategory];

  return (
    <CategoryContainer>
      <Container $gutter={[16, 0]}>
        <ChildCategoryBar
          size="small"
          animated={false}
          activeKey={activeKey}
          items={categorys}
          onChange={onActiveKeyChange}
        />
      </Container>
    </CategoryContainer>
  );
};

/**
 * @title 组合展示容器
 * @param {string} groupKey 当前分类key
 */
const GroupContainer = ({ groupKey }) => {
  const { data: bookmarkCategorys } = useRequest(GetBookmarkMarketCategorys);
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    setActiveKey('');
  }, [groupKey]);

  return (
    <>
      <ChildCategory
        activeKey={groupKey}
        items={bookmarkCategorys}
        onActiveKeyChange={setActiveKey}
      />
      <Container $gutter={[16, 0]}>
        {groupKey === 'team' && <TeamView classId={activeKey} />}
        {groupKey === 'collect' && <CollectView classId={activeKey} />}
      </Container>
    </>
  );
};

/**
 * @title 组合分类
 * @param {string} activeKey 当前分类key
 * @param {Function} onActiveKeyChange 切换分类key
 *
 */
const GroupCategory = ({ activeKey, onActiveKeyChange }) => {
  return (
    <CategoryContainer>
      <Container $gutter={[16, 0]}>
        <CategoryBar
          activeKey={activeKey}
          items={GroupCategorys}
          onChange={onActiveKeyChange}
        />
      </Container>
    </CategoryContainer>
  );
};

const BannerPanel = styled.div`
  background-color: #1677ff;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Desc = styled.p`
  font-size: 14px;
`;

const TopBG = () => (
  <BannerPanel>
    <Container $gutter={[16, 24]}>
      <Title>发现你身边有趣好玩的事物</Title>
      <Desc>发现·收藏·分享--记忆·兴趣·智慧</Desc>
    </Container>
  </BannerPanel>
);

const Component = () => {
  const [groupKey, setGroupKey] = useState(InitialGroupkey);

  return (
    <>
      <TopBG />
      <GroupCategory activeKey={groupKey} onActiveKeyChange={setGroupKey} />
      <GroupContainer groupKey={groupKey} />
    </>
  );
};

export default Component;
