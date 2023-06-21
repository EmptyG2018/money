import { Avatar, Button, Card, Image, Tag, Row, Col, Space } from "antd";
import {
  FolderOpenOutlined,
  PayCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { styled } from "styled-components";

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

const CollectFolder = () => {
  return (
    <CollectFolderRoot
      bodyStyle={{ display: "flex", flexDirection: "column", padding: 14 }}
    >
      <CollectFolderName>各类资源下载站</CollectFolderName>
      <CollectFolderStat>
        <Space>
          <span>
            <FolderOpenOutlined /> 0
          </span>
          <span>
            <PayCircleOutlined /> 0
          </span>
          <span>
            <EyeOutlined /> 0
          </span>
        </Space>
      </CollectFolderStat>
      <CollectFolderFooter>
        <Avatar size={28} />
        <CollectFolderDate>2023-04-26</CollectFolderDate>
      </CollectFolderFooter>
    </CollectFolderRoot>
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
  const records = new Array(10).fill({
    title: "百度大数据",
    desc: "百度大数据",
    thumb:
      "https://pptwd.oss-cn-shenzhen.aliyuncs.com/yj/static/img/2023/04/17/1682985472956.png",
    tags: ["你好"],
    name: "jon",
    avatar:
      "https://himg.bdimg.com/sys/portraitn/item/public.1.5c0e99fc.N38xm64QGsEOc2YffDzNsA",
    date: "2023-04-17",
  });

  return (
    <PageContainer title={false}>
      <ProCard gutter={[20, 20]} wrap>
        <ProCard bordered colSpan={{ sm: 24, md: 8, lg: 6 }}>
          <UserInfo>
            <Avatar size={64} />
            <NickName>羿铁示崖叙</NickName>
            <InfoCell>
              <InfoCellItem>
                0<br />
                关注者
              </InfoCellItem>
              <InfoCellItem>
                0<br />
                关注了
              </InfoCellItem>
            </InfoCell>
            <InfoEditBtn type="primary" block>
              编辑资料
            </InfoEditBtn>
          </UserInfo>
          <InfoHeader>简介</InfoHeader>
          <InfoDesc>
            创作1篇公开收藏集
            <br />
            获得1个赞
          </InfoDesc>
          <InfoDesc>
            创作2篇公开团队
            <br />
            获得0个赞
          </InfoDesc>
        </ProCard>
        <ProCard
          bordered
          colSpan={{ sm: 24, md: 16, lg: 18 }}
          tabs={{
            items: [
              {
                label: `收藏集`,
                key: "tab1",
                children: (
                  <Row
                    gutter={[
                      { xs: 8, sm: 12, md: 18, lg: 20 },
                      { xs: 4, sm: 8, md: 12, lg: 16 },
                    ]}
                  >
                    {new Array(10).fill().map((item) => (
                      <Col xs={24} sm={12} lg={8}>
                        <CollectFolder />
                      </Col>
                    ))}
                  </Row>
                ),
              },
              {
                label: `公开团队`,
                key: "tab2",
                children: (
                  <Row
                    gutter={[
                      { xs: 8, sm: 12, md: 18, lg: 20 },
                      { xs: 4, sm: 8, md: 12, lg: 16 },
                    ]}
                  >
                    {records.map((item) => (
                      <Col xs={12} lg={8}>
                        <Team
                          title={item.title}
                          desc={item.desc}
                          thumb={item.thumb}
                          tags={item.tags}
                          name={item.name}
                          avatar={item.avatar}
                          date={item.date}
                        />
                      </Col>
                    ))}
                  </Row>
                ),
              },
              {
                label: `加入团队`,
                key: "tab3",
                children: (
                  <Row
                    gutter={[
                      { xs: 8, sm: 12, md: 18, lg: 20 },
                      { xs: 4, sm: 8, md: 12, lg: 16 },
                    ]}
                  >
                    {records.map((item) => (
                      <Col xs={12} lg={8}>
                        <Team
                          title={item.title}
                          desc={item.desc}
                          thumb={item.thumb}
                          tags={item.tags}
                          name={item.name}
                          avatar={item.avatar}
                          date={item.date}
                        />
                      </Col>
                    ))}
                  </Row>
                ),
              },
            ],
          }}
        ></ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Component;
