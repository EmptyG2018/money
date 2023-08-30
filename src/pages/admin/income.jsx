import { useState, useRef } from "react";
import { Button, Row, Col, Space, Drawer, Typography, message } from "antd";
import {
  PayCircleOutlined,
  AccountBookOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  ProCard,
  ProForm,
  ProFormText,
  ProTable,
  PageContainer,
  StatisticCard,
} from "@ant-design/pro-components";
import { styled } from "styled-components";

const Alert = styled.p`
  margin: 0;
  padding: 16px;
  line-height: 1.7;
  background-color: #e6f4ff;
  border: 1px solid #91caff;
  border-radius: 4px;
`;

const DetailRecordDrawer = styled(Drawer)`
  .ant-drawer-header {
    display: none;
  }
`;

const IncomeRender = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 48,
    },
    {
      title: "卡密",
      dataIndex: "code",
    },
    {
      title: "使用人",
      dataIndex: "useUserName",
    },
    {
      title: "使用时间",
      dataIndex: "useTime",
    },
  ];

  return (
    <ProTable
      search={false}
      options={false}
      ghost
      columns={columns}
      dataSource={[
        {
          id: "123",
          code: "gke80ejekq2kiei",
          useUserName: "胡超",
          useTime: "2021-09-11 12:00:00",
        },
      ]}
    />
  );
};

const DrawMoneyRender = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 48,
    },
    {
      title: "卡密",
      dataIndex: "code",
    },
    {
      title: "使用人",
      dataIndex: "useUserName",
    },
    {
      title: "使用时间",
      dataIndex: "useTime",
    },
  ];

  return (
    <ProTable
      search={false}
      options={false}
      ghost
      columns={columns}
      dataSource={[
        {
          id: "123",
          code: "gke80ejekq2kiei",
          useUserName: "胡超",
          useTime: "2021-09-11 12:00:00",
        },
      ]}
    />
  );
};

const Component = () => {
  const formRef = useRef(null);
  const [tabKey, setTabKey] = useState("income");
  const [showDrawer, setShowDrawer] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const submit = () => {};

  return (
    <>
      {contextHolder}
      <PageContainer
        fixedHeader
        header={{
          title: "佣金收入",
          style: { background: "#fff" },
        }}
        content={
          <StatisticCard.Group>
            <StatisticCard
              statistic={{
                title: (
                  <>
                    <Space size={16}>
                      <span>累计收入</span>
                      <Typography.Link
                        onClick={() => {
                          setTabKey("income");
                          setShowDrawer(true);
                        }}
                      >
                        明细
                      </Typography.Link>
                    </Space>
                  </>
                ),
                value: 0,
                prefix: "¥",
                icon: (
                  <AccountBookOutlined
                    style={{ fontSize: "32px", color: "orange" }}
                  />
                ),
              }}
            />
            <StatisticCard.Divider />
            <StatisticCard
              statistic={{
                title: (
                  <>
                    <Space size={16}>
                      <span>待提现</span>
                      <Typography.Link
                        onClick={() => {
                          setTabKey("drawMoney");
                          setShowDrawer(true);
                        }}
                      >
                        明细
                      </Typography.Link>
                    </Space>
                  </>
                ),
                value: 0,
                prefix: "¥",
                icon: (
                  <PayCircleOutlined
                    style={{ fontSize: "32px", color: "red" }}
                  />
                ),
              }}
            />
          </StatisticCard.Group>
        }
      >
        <ProCard
          title="支付宝提款"
          subTitle="注: 需要实名的支付宝信息，个人/企业 支付宝都支持"
        >
          <ProForm
            formRef={formRef}
            layout="horizontal"
            labelCol={{ xs: 8 }}
            onFinish={submit}
            submitter={{
              render: (props, dom) => {
                return (
                  <Row>
                    <Col offset={8}>
                      <Space>
                        <Button type="primary" htmlType="submit">
                          立即提款
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                );
              },
            }}
          >
            <ProFormText
              width="md"
              name="code"
              label="支付宝账号"
              placeholder="请输入支付宝账号（邮箱/手机号）"
              rules={[
                {
                  required: true,
                  message: "请输入支付宝账号",
                },
              ]}
            />
            <ProFormText
              width="md"
              name="code"
              label="支付宝账号姓名"
              placeholder="请输入支付宝账号姓名"
              rules={[
                {
                  required: true,
                  message: "请输入支付宝账号姓名",
                },
              ]}
            />
          </ProForm>
          <br />
          <Alert>
            1.收入:用户在您网站下单购买，或您网站的注册用户在圣才官网或圣才电子书APP下单购买，所得收益都会计入您的收入。
            <br />
            2，待提现:自动提现，这里一般起是0.00元、除非你的账户余额为色、为零或不足订单扣除，才会出现待提现金额，待你账户充值足够，单扣除，系统会自动提现。
            <br />
            3，详细规则说明请查看:<a>详细说明</a>
          </Alert>
        </ProCard>
      </PageContainer>

      <DetailRecordDrawer
        bodyStyle={{ padding: 0 }}
        width={720}
        placement="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <ProCard
          tabs={{
            activeKey: tabKey,
            items: [
              {
                key: "income",
                label: "累计收入",
                children: <IncomeRender />,
              },
              {
                key: "drawMoney",
                label: "待提款",
                children: <DrawMoneyRender />,
              },
            ],
            tabBarExtraContent: (
              <Button
                type="text"
                size="small"
                style={{ marginInlineEnd: "16px" }}
                icon={<CloseOutlined />}
                onClick={() => setShowDrawer(false)}
              />
            ),
            onChange: setTabKey,
          }}
        ></ProCard>
      </DetailRecordDrawer>
    </>
  );
};

export default Component;
