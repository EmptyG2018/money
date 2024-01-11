import { Image, Avatar, Button, Space, Tag, Row, Col, Typography } from "antd";
import {
  TagOutlined,
  TeamOutlined,
  EyeOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { styled } from "styled-components";
import Container from "@components/Container";

const TeamTitle = styled.h1`
  font-size: 22px;
  margin: 0;
  padding: 0;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const TeamDesc = styled.p`
  margin: 0;
  padding: 0;
  color: #5f5f5f;
  margin-bottom: 16px;
`;

const TeamTag = styled.div`
  margin-bottom: 12px;
`;

const TeamRecord = styled.div`
  margin-bottom: 12px;
`;

const TeamAction = styled.div`
  margin-top: 24px;
`;

const Component = () => {
  return (
    <>
      <Container title={false}>
        <ProCard>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Image
                    src="https://pptwd.oss-cn-shenzhen.aliyuncs.com/yj/static/img/2023/04/17/1682985472956.png"
                    width="100%"
                    preview={false}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <Row>
                    <Col span={24}>
                      <TeamTitle>百度大数据</TeamTitle>
                    </Col>
                    <Col span={24}>
                      <TeamDesc>百度大数据</TeamDesc>
                    </Col>
                    <Col span={24}>
                      <TeamTag>
                        <Space size={0}>
                          <Tag bordered={false}>Tag 1</Tag>
                          <Tag bordered={false}>Tag 1</Tag>
                          <Tag bordered={false}>Tag 1</Tag>
                          <Tag bordered={false}>Tag 1</Tag>
                        </Space>
                      </TeamTag>
                    </Col>
                    <Col span={24}>
                      <TeamRecord>
                        <Space size={12}>
                          <Typography.Text type="secondary">
                            <TeamOutlined /> 0
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            <EyeOutlined /> 0
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            <HeartOutlined /> 0
                          </Typography.Text>
                        </Space>
                      </TeamRecord>
                    </Col>
                    <Col xs={24} md={0}>
                      <Space>
                        <Avatar
                          src="https://himg.bdimg.com/sys/portraitn/item/public.1.5c0e99fc.N38xm64QGsEOc2YffDzNsA"
                          size={24}
                        />
                        张三丰 创建
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Row gutter={8} align="middle" justify="end">
                <Col xs={0} md={22} justify="end">
                  <div style={{ textAlign: 'right' }}>ganxinge 创建</div>
                </Col>
                <Col xs={0} md={2}>
                  <div style={{ textAlign: "right" }}>
                    <Avatar
                      src="https://himg.bdimg.com/sys/portraitn/item/public.1.5c0e99fc.N38xm64QGsEOc2YffDzNsA"
                      size={36}
                    />
                  </div>
                </Col>
              </Row>
              <Row align="middle" justify="end">
                <Col>
                  <TeamAction>
                    <Space>
                      <Button type="primary">加入团队</Button>
                      <Button>收藏 0</Button>
                      <Button>浏览 0</Button>
                    </Space>
                  </TeamAction>
                </Col>
              </Row>
            </Col>
          </Row>
        </ProCard>
      </Container>
    </>
  );
};

export default Component;
