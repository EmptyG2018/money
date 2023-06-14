import { Button, Col, Row, Space } from "antd";
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormText,
  ProFormRadio,
} from "@ant-design/pro-components";

const Component = () => {
  return (
    <PageContainer title={false}>
      <ProCard gutter={[24, 24]} wrap style={{ background: "none" }}>
        <ProCard title="购买VIP用户组" colSpan={{ xs: 24, lg: 16 }}>
          <ProForm
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            submitter={{
              render: (props, doms) => {
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
          >
            <ProFormText
              readonly
              width="md"
              name="name"
              label="你的账号"
              placeholder="请输入名称"
            />
            <ProFormRadio.Group
              name="radio-group"
              label="购买时长"
              radioType="button"
              options={[
                {
                  label: "一个月专业版",
                  value: "a",
                },
                {
                  label: "一年专业版",
                  value: "b",
                },
                {
                  label: "二年专业版",
                  value: "c",
                },
              ]}
            />
            <ProFormText
              readonly
              width="md"
              name="name"
              label="开通时长"
              placeholder="请输入名称"
            />
            <ProFormText
              readonly
              width="md"
              name="name"
              label="市场售价"
              placeholder="请输入名称"
            />
            <ProFormText
              width="md"
              name="name"
              label="卡密"
              placeholder="输入卡密"
            />
          </ProForm>
        </ProCard>
        <ProCard title="用户信息" colSpan={{ xs: 24, lg: 8 }}>
          <ProForm
            layout="horizontal"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            submitter={false}
          >
            <ProFormText
              readonly
              width="md"
              name="name"
              label="当前登录用户"
              placeholder="请输入名称"
            />
            <ProFormText
              readonly
              width="md"
              name="name"
              label="用户组"
              placeholder="输入卡密"
            />
          </ProForm>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Component;
