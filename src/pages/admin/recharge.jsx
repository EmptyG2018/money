import { useRef, useEffect } from "react";
import { Button, Space, Typography, message } from "antd";
import {
  ProCard,
  PageContainer,
  ProForm,
  ProFormText,
  ProFormRadio,
  ProFormMoney,
} from "@ant-design/pro-components";
import { styled } from "styled-components";
import { GetProperty, RechargeCard } from "../../services/user";

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

  useEffect(() => {
    (async () => {
      const property = await GetProperty();
      formRef.current?.setFieldsValue({
        money: property?.result?.money || 0,
      });
    })();
  }, []);

  const submit = async ({ code }) => {
    try {
      await RechargeCard({ code });
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
            新用户注册送10元!
            <br />
            每邀请一位用户，赠送5元现金，满30元可申请提现。
            <br />
            可用于资源购买、会员升级、源码安装、资源代下等服务。
          </Alert>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Component;
