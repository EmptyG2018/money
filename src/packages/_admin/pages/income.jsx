import { useState, useEffect, useRef } from "react";
import { Button, Space, Drawer, Typography, message } from "antd";
import {
  PayCircleOutlined,
  AccountBookOutlined,
  CloseOutlined,
  AlipayCircleOutlined,
} from "@ant-design/icons";
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormMoney,
  ProTable,
  StatisticCard,
  CheckCard,
} from "@ant-design/pro-components";
import { styled } from "styled-components";
import { useRequest } from "ahooks";
import {
  GetAgentProperty,
  DrawAgentAliMoney,
  BindAgentAliAccount,
} from "@services/property";
import {
  GetAgentKickbackRecord,
  GetAgentDrawMoneyRecord,
} from "@services/statistics";
import { PageContainer } from "@components/Container";

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
  const { runAsync: getAgentKickbackRecord } = useRequest(
    GetAgentKickbackRecord,
    {
      manual: true,
    }
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 48,
    },
    {
      title: "订单",
      dataIndex: "orderId",
      copyable: true,
    },
    {
      title: "分佣金额",
      dataIndex: "money",
    },
    {
      title: "修改前金额",
      dataIndex: "changeMoney",
    },
    {
      title: "总金额",
      dataIndex: "totalMoney",
    },
    {
      title: "佣金说明",
      dataIndex: "remark",
    },
  ];

  return (
    <ProTable
      search={false}
      options={false}
      ghost
      columns={columns}
      request={async ({ pageSize, current }) => {
        const res = await getAgentKickbackRecord({
          pageNum: current,
          pageSize,
        });
        const { rows = [], total = 0 } = res || {};
        return {
          data: rows,
          success: true,
          total,
        };
      }}
    />
  );
};

const DrawMoneyRender = () => {
  const { runAsync: getAgentDrawMoneyRecord } = useRequest(
    GetAgentDrawMoneyRecord,
    {
      manual: true,
    }
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 48,
    },
    {
      title: "订单",
      dataIndex: "orderId",
      copyable: true,
    },
    {
      title: "提款金额",
      dataIndex: "money",
    },
    {
      title: "修改前金额",
      dataIndex: "changeMoney",
    },
    {
      title: "总金额",
      dataIndex: "totalMoney",
    },
    {
      title: "审核类型",
      dataIndex: "processType",
      valueType: "select",
      valueEnum: {
        0: {
          text: "待审核",
          status: "Processing",
        },
        1: {
          text: "已审核",
          status: "Success",
        },
        2: {
          text: "驳回",
          status: "Error",
        },
      },
    },
    {
      title: "审核原因",
      dataIndex: "processRemark",
    },
    {
      title: "提款说明",
      dataIndex: "remark",
    },
  ];

  return (
    <ProTable
      search={false}
      options={false}
      ghost
      columns={columns}
      request={async ({ pageSize, current }) => {
        const res = await getAgentDrawMoneyRecord({
          pageNum: current,
          pageSize,
        });
        const { rows = [], total = 0 } = res || {};
        return {
          data: rows,
          success: true,
          total,
        };
      }}
    />
  );
};

const Component = () => {
  const bindFormRef = useRef(null);
  const drawFormRef = useRef(null);
  const [tabKey, setTabKey] = useState("income");
  const [bindPage, setBindPage] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { refresh: refreshAgentProperty, data: property } =
    useRequest(GetAgentProperty);
  const { runAsync: bindAgentAliAccount } = useRequest(BindAgentAliAccount, {
    manual: true,
  });
  const { runAsync: drawAgentAliMoney } = useRequest(DrawAgentAliMoney, {
    manual: true,
  });

  useEffect(() => {
    setBindPage(!(!!property?.alipayAccount && !!property?.alipayName));
  }, [property]);

  useEffect(() => {
    bindPage &&
      bindFormRef.current.setFieldsValue({
        alipayAccount: property?.alipayAccount,
        alipayName: property?.alipayName,
      });
  }, [property, bindPage]);

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
                value: property?.totleCommissionMoney,
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
                value: property?.totleWithdrawalMoney,
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
          subTitle={
            <>
              <span>注: 实名制的个人/企业 支付宝都支持。</span>
              {!bindPage && (
                <Typography.Link onClick={() => setBindPage(true)}>
                  修改提款账号
                </Typography.Link>
              )}
            </>
          }
        >
          {bindPage ? (
            <ProForm
              formRef={bindFormRef}
              onFinish={async (values) => {
                try {
                  await bindAgentAliAccount(values);
                  messageApi.success("账号绑定成功！");

                  refreshAgentProperty();
                } catch (err) {
                  messageApi.error(err.message);
                }
              }}
              submitter={{
                render: (props, dom) => {
                  return (
                    <Button type="primary" htmlType="submit">
                      绑定账户
                    </Button>
                  );
                },
              }}
            >
              <ProForm.Group>
                <ProFormText
                  width="md"
                  name="alipayAccount"
                  label="支付宝账号"
                  placeholder="请输入支付宝账号（邮箱/手机号）"
                  rules={[
                    {
                      required: true,
                      message: "请输入支付宝账号",
                    },
                  ]}
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormText
                  width="md"
                  name="alipayName"
                  label="支付宝账号姓名"
                  placeholder="请输入支付宝账号姓名"
                  rules={[
                    {
                      required: true,
                      message: "请输入支付宝账号姓名",
                    },
                  ]}
                />
              </ProForm.Group>
            </ProForm>
          ) : (
            <>
              <div style={{ color: "rgba(0, 0, 0, 0.88)", padding: "0 0 8px" }}>
                提款账号
              </div>
              <CheckCard
                avatar={
                  <AlipayCircleOutlined
                    style={{ fontSize: "28px", color: "#1477ff" }}
                  />
                }
                title={`${property?.alipayName} (${property?.alipayAccount})`}
                description="支付宝是全球领先的独立第三方支付平台"
                checked
              />
              <ProForm
                formRef={drawFormRef}
                layout="vertical"
                onFinish={async (values) => {
                  try {
                    await drawAgentAliMoney(values);
                    messageApi.success("提款成功");

                    refreshAgentProperty();
                  } catch (err) {
                    messageApi.error(err.message);
                  }
                }}
                submitter={{
                  render: (props, dom) => {
                    return (
                      <Button type="primary" htmlType="submit">
                        提款
                      </Button>
                    );
                  },
                }}
              >
                <ProForm.Item noStyle>
                  <ProFormMoney
                    width="sm"
                    name="money"
                    label="提款金额"
                    placeholder="提款金额"
                    fieldProps={{
                      min: 0,
                    }}
                    rules={[
                      {
                        required: true,
                        message: "请输入提款金额",
                      },
                    ]}
                  />
                </ProForm.Item>
              </ProForm>
            </>
          )}
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
        width={860}
        placement="right"
        open={showDrawer}
        destroyOnClose
        onClose={() => setShowDrawer(false)}
      >
        <ProCard
          tabs={{
            activeKey: tabKey,
            destroyInactiveTabPane: true,
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
