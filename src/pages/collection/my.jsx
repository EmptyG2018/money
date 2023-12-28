import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Avatar, Card, Image, Tag, Row, Col, Space, Pagination } from "antd";
import {
  FolderOpenOutlined,
  PayCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { GetMyCollectLikes } from "@services/collection/collect";
import { GetMyTeamLikes } from "@services/collection/team";
import {
  ResourceSearch,
  HeaderPanel,
} from "@components/collection/HeaderPanel";
import ToggleCollapsedBtn from "@components/collection/ToggleCollapsedBtn";
import { ProCard } from "@ant-design/pro-components";
import styled from "styled-components";

const PAGE_SIZE = 16;

const DataPlaceholder = styled.div``;

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

const CollectView = ({ keyword }) => {
  const [pageNum, setPageNum] = useState(1);
  const { data: collects } = useRequest(
    () => GetMyCollectLikes({ title: keyword, pageNum, pageSize: PAGE_SIZE }),
    {
      refreshDeps: [pageNum, keyword],
    }
  );

  useEffect(() => {
    setPageNum(1);
  }, [keyword]);

  return (
    <>
      <DataPlaceholder>
        <Row
          gutter={[
            { xs: 8, sm: 12, md: 18, lg: 20 },
            { xs: 4, sm: 8, md: 12, lg: 16 },
          ]}
        >
          {(collects?.rows || []).map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.id}>
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
      </DataPlaceholder>
      <Pagination
        style={{ textAlign: "center" }}
        current={pageNum}
        pageSize={PAGE_SIZE}
        total={collects?.total}
        onChange={setPageNum}
      />
    </>
  );
};

const TeamView = ({ keyword }) => {
  const [pageNum, setPageNum] = useState(1);
  const { data: teams } = useRequest(
    () => GetMyTeamLikes({ title: keyword, pageNum, pageSize: PAGE_SIZE }),
    {
      refreshDeps: [pageNum, keyword],
    }
  );

  useEffect(() => {
    setPageNum(1);
  }, [keyword]);

  return (
    <>
      <DataPlaceholder>
        <Row
          gutter={[
            { xs: 8, sm: 12, md: 18, lg: 20 },
            { xs: 4, sm: 8, md: 12, lg: 16 },
          ]}
        >
          {(teams?.rows || []).map((item) => (
            <Col xs={12} lg={8} key={item.id}>
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
      </DataPlaceholder>
      <Pagination
        style={{ textAlign: "center" }}
        current={pageNum}
        pageSize={PAGE_SIZE}
        total={teams?.total}
        onChange={setPageNum}
      />
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  height: 0;
  overflow-y: auto;
`;

export default () => {
  const [searchParams] = useSearchParams();
  const [activeKey, setActiveKey] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setActiveKey(searchParams.get("active") !== "team" ? "collect" : "team");
  }, [searchParams]);

  return (
    <Content>
      <HeaderPanel
        title={
          <>
            <ToggleCollapsedBtn />
            <ResourceSearch placeholder="请输入关键词" onSearch={setKeyword} />
          </>
        }
      />
      <Container>
        <ProCard
          colSpan={{ sm: 24, md: 16, lg: 18 }}
          tabs={{
            activeKey,
            items: [
              {
                label: `收藏夹`,
                key: "collect",
                children: <CollectView keyword={keyword} />,
              },
              {
                label: `公开团队`,
                key: "team",
                children: <TeamView keyword={keyword} />,
              },
            ],
            destroyInactiveTabPane: true,
            onChange: setActiveKey,
          }}
        ></ProCard>
      </Container>
    </Content>
  );
};
