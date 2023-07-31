import { useEffect, useRef } from "react";
import { Button, Col, Row, Space, message } from "antd";
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormRadio,
  ProFormMoney,
} from "@ant-design/pro-components";
import { useSelector } from "react-redux";
import Container from "../components/Container";
import { useBuyUserGroup, useBuyUserKey } from "../hooks/cardKey";

const Component = () => {
  const buykeyForm = useRef();
  const sideForm = useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const { info } = useSelector(({ user }) => user);
  const { userGroup } = useBuyUserGroup(1);
  const { buy } = useBuyUserKey();

  useEffect(() => {
    buykeyForm.current?.setFieldsValue({
      account: info?.account,
    });
  }, []);

  useEffect(() => {
    sideForm.current?.setFieldsValue({
      username: info?.username,
      groupTitle: info?.groupTitle,
    });
  });

  const submit = async () => {
    const formData = buykeyForm.current.getFieldsFormatValue();
    const { groupId, code } = formData;
    try {
      await buy({ dlId: 1, groupId, code });
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <Container title={false} gutter={[0, 12]}>
        <ProCard gutter={[24, 24]} wrap ghost>
          <ProCard title="购买VIP用户组" colSpan={{ xs: 24, lg: 16 }}>
            <ProForm
              formRef={buykeyForm}
              layout="horizontal"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
              submitter={{
                render: (props, dom) => {
                  return (
                    <Row>
                      <Col span={14} offset={4}>
                        <Space>
                          <Button type="primary" htmlType="submit">
                            确认购买
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  );
                },
              }}
              onFinish={submit}
            >
              <ProFormText
                readonly
                width="md"
                name="account"
                label="你的账号"
                placeholder="请输入名称"
              />
              <ProFormRadio.Group
                name="groupId"
                label="购买时长"
                radioType="button"
                options={(userGroup?.groupList || []).map((item) => ({
                  label: item.groupTitle,
                  value: item.id,
                }))}
                rules={[
                  {
                    required: true,
                    message: "请选择购买时长",
                  },
                ]}
                onChange={(e) => {
                  const item = (userGroup?.groupList || []).find(
                    (item) => item.id === e.target.value
                  );
                  buykeyForm.current.setFieldsValue({
                    buyDuration: item?.dayTime,
                    marketPrice: item?.defaultSellPrice,
                  });
                }}
              />
              <ProFormText
                readonly
                width="md"
                name="buyDuration"
                label="开通时长"
                fieldProps={{
                  suffix: " 小时",
                }}
                placeholder="请输入名称"
              />
              <ProFormMoney
                readonly
                width="md"
                name="marketPrice"
                label="市场售价"
                placeholder="请输入名称"
              />
              <ProFormText.Password
                width="md"
                name="code"
                label="卡密"
                placeholder="输入卡密"
                rules={[
                  {
                    required: true,
                    message: "请输入卡密",
                  },
                ]}
              />
            </ProForm>
          </ProCard>
          <ProCard title="用户信息" colSpan={{ xs: 24, lg: 8 }}>
            <ProForm
              formRef={sideForm}
              layout="horizontal"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              submitter={false}
            >
              <ProFormText
                readonly
                width="md"
                name="username"
                label="当前用户"
                placeholder="请输入名称"
              />
              <ProFormText
                readonly
                width="md"
                name="groupTitle"
                label="用户组"
                placeholder="输入卡密"
              />
            </ProForm>
          </ProCard>
        </ProCard>
      </Container>
    </>
  );
};

export default Component;
