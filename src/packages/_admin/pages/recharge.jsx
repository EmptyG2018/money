import { useRef, useEffect } from "react";
import { Button, Space, Typography, message } from "antd";
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormRadio,
  ProFormMoney,
} from "@ant-design/pro-components";
import { styled } from "styled-components";
import { useRequest } from "ahooks";
import { GetProperty, RechargeCard } from "@services/user";
import { PageContainer } from "@components/Container";

const Alert = styled.p`
  margin: 0;
  padding: 16px;
  line-height: 1.7;
  background-color: #e6f4ff;
  border: 1px solid #91caff;
  border-radius: 4px;
`;

const Component = () => {
  const formRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { data: property } = useRequest(GetProperty);
  const { runAsync: rechargeCard } = useRequest(RechargeCard, {
    manual: true,
  });

  useEffect(() => {
    formRef.current?.setFieldsValue({
      money: property?.money || 0,
    });
  }, [property]);

  const submit = async ({ code }) => {
    try {
      await rechargeCard({ code });
      messageApi.success("充值成功!");
      formRef.current?.resetFields();
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <PageContainer
        fixedHeader
        header={{
          title: "金额充值",
          style: { background: "#fff" },
        }}
      >
        <ProCard title="充值平台">
          <ProForm
            formRef={formRef}
            layout="horizontal"
            onFinish={submit}
            submitter={{
              render: (props, dom) => {
                return (
                  <Button type="primary" htmlType="submit">
                    确认充值
                  </Button>
                );
              },
            }}
          >
            <ProFormMoney width="xs" label="当前余额" name="money" readonly />
            <ProFormRadio.Group
              radioType="button"
              width="md"
              name="method"
              label="充值方式"
              initialValue="card"
              options={[
                {
                  label: "充值卡",
                  value: "card",
                },
              ]}
            />
            <ProForm.Group size="small">
              <ProFormText
                width="md"
                name="code"
                label="充值卡号"
                placeholder="请输入卡号"
                rules={[
                  {
                    required: true,
                    message: "请输入卡号",
                  },
                ]}
              />
              <Button type="link" href="/buykey">
                如何获取卡密？
              </Button>
            </ProForm.Group>
          </ProForm>
          <br />
          <Alert>
            充值金额用于抵扣用户开通时产生的系统成本价
            <br/>
            不支持提现,只能用于平台消耗抵扣
            <br/>
            金额不足请及时充值,否则会影响用户购买
          </Alert>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Component;
