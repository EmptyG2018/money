import { Fragment } from 'react';
import { Row, Col, Card, Image } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import links from '@package_navigation/constant/link';
import styled from 'styled-components';

const ApplicationRoot = styled(Card)`
  &:hover {
    cursor: pointer;
  }
`;

const ApplicationCell = styled.div`
  margin-left: 8px;
  flex: 1 0 0;
  width: 0;
`;

const ApplicationTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ApplicationDesc = styled.p`
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: #6c757d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Application = ({ thumb, title, desc, onClick }) => {
  return (
    <ApplicationRoot
      bodyStyle={{ display: 'flex', alignItems: 'center', padding: 14 }}
      onClick={onClick}
    >
      <Image src={thumb} width={36} height={36} preview={false} />
      <ApplicationCell>
        <ApplicationTitle>{title}</ApplicationTitle>
        <ApplicationDesc>{desc}</ApplicationDesc>
      </ApplicationCell>
    </ApplicationRoot>
  );
};

const SectionHeaderRoot = styled.div`
  display: flex;
  padding: 8px 0;
  margin: 24px 0 8px 0;
`;
const SectionHeaderIcon = styled.div`
  margin-right: 4px;
`;
const SectionHeaderTitle = styled.p`
  padding: 0;
  margin: 0;
`;

const SectionHeader = ({ icon, title }) => {
  return (
    <SectionHeaderRoot>
      {icon && <SectionHeaderIcon>{icon}</SectionHeaderIcon>}
      <SectionHeaderTitle>{title}</SectionHeaderTitle>
    </SectionHeaderRoot>
  );
};

const ApplicationList = () => {
  return links.map((item, index) => (
    <Fragment key={index}>
      <SectionHeader icon={<AppstoreOutlined />} title={item.name} />
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 18, lg: 20 },
          { xs: 4, sm: 8, md: 12, lg: 16 },
        ]}
      >
        {item.siteList.map((site, index) => (
          <Col xs={12} sm={8} md={6} lg={4} key={index}>
            <Application
              thumb={'./imgs/site/' + site.icon}
              title={site.name}
              desc={site.desc}
              onClick={() => window.open(site.url)}
            />
          </Col>
        ))}
      </Row>
    </Fragment>
  ));
};

export default ApplicationList;
