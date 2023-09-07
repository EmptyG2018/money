import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Input,
  Tabs,
  Row,
  Col,
  Card,
  Tag,
  Space,
  Avatar,
  Image,
  Pagination,
} from "antd";
import { styled } from "styled-components";
import { useRequest } from "ahooks";
import {
  GetBookmarkMarketTeams,
  GetBookmarkMarketCollects,
} from "../services/bookmark";
import Container from "../components/Container";

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

const TeamView = ({ searchKey }) => {
  const [pageIndex, setPageIndex] = useState(1);

  const pageSize = 2;

  const { data: teams } = useRequest(GetBookmarkMarketTeams);

  return (
    <Container title={false} gutter={[12, 24]}>
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 18, lg: 20 },
          { xs: 4, sm: 8, md: 12, lg: 16 },
        ]}
      >
        {(teams?.rows || []).map((item) => (
          <Col xs={12} sm={8} lg={6}>
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

      <Pagination
        current={pageIndex}
        pageSize={pageSize}
        total={teams?.total}
        onChange={setPageIndex}
      />
    </Container>
  );
};

const CollectView = ({ searchKey }) => {
  const [pageIndex, setPageIndex] = useState(1);

  const pageSize = 2;

  const { data: collects } = useRequest(GetBookmarkMarketCollects);

  return (
    <Container title={false} gutter={[12, 24]}>
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 18, lg: 20 },
          { xs: 4, sm: 8, md: 12, lg: 16 },
        ]}
      >
        {(collects?.rows || []).map((item) => (
          <Col xs={12} sm={8} lg={6}>
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

      <Pagination
        current={pageIndex}
        pageSize={pageSize}
        total={collects?.total}
        onChange={setPageIndex}
      />
    </Container>
  );
};

const SearchPanel = styled.div`
  max-width: 640px;
  margin: 0 auto;
  margin-bottom: 32px;
`;

const Component = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type");
  const keyword = searchParams.get("keyword");

  const viewMap = {
    team: TeamView,
    collect: CollectView,
  };

  return (
    <>
      <Container title={false} gutter={[16, 24]}>
        <SearchPanel>
          <Input.Search
            defaultValue={keyword}
            autoFocus
            placeholder="搜索"
            size="large"
            onSearch={(keyword) => {
              keyword.trim() &&
                setSearchParams(`type=${type}&keyword=${keyword}`);
            }}
          />
        </SearchPanel>

        <Tabs
          defaultActiveKey={type}
          items={[
            {
              key: "team",
              label: `优秀团队`,
            },
            {
              key: "collect",
              label: `收藏夹`,
            },
          ]}
          onChange={(key) => setSearchParams(`type=${key}&keyword=${keyword}`)}
        />
      </Container>

      {viewMap[type] && viewMap[type]({ searchKey: keyword })}
    </>
  );
};

export default Component;
