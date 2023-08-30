import { useRef } from "react";
import { Button, message } from "antd";
import {
  QuestionCircleOutlined,
  RobotOutlined,
  AliwangwangOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
  RadiusUpleftOutlined,
  BorderLeftOutlined,
  RadiusBottomleftOutlined,
  RadiusUprightOutlined,
  BorderRightOutlined,
  RadiusBottomrightOutlined,
} from "@ant-design/icons";
import {
  ProCard,
  ProForm,
  ProFormText,
  PageContainer,
  ProFormRadio,
} from "@ant-design/pro-components";
import { styled } from "styled-components";

const LocationIconRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const LocationIcon = ({ icon, title, ...props }) => {
  return (
    <LocationIconRoot {...props}>
      <span>{icon}</span>
      <span>{title}</span>
    </LocationIconRoot>
  );
};

const Component = () => {
  const formRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();

  const submit = () => {};

  return (
    <>
      {contextHolder}
      <PageContainer
        fixedHeader
        header={{
          title: "配置客服",
          style: { background: "#fff" },
        }}
      >
        <ProCard>
          <ProForm
            formRef={formRef}
            layout="horizontal"
            initialValues={{
              show: "on",
              style: "one",
            }}
            onFinish={submit}
            submitter={{
              render: (props, dom) => {
                return (
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                );
              },
            }}
          >
            <ProForm.Group title="图标显隐">
              <ProFormRadio.Group
                name="show"
                options={[
                  {
                    label: "开启",
                    value: "on",
                  },
                  {
                    label: "关闭",
                    value: "off",
                  },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group title="图标风格">
              <ProFormRadio.Group
                name="style"
                options={[
                  {
                    label: (
                      <QuestionCircleOutlined
                        style={{ fontSize: "32px", marginRight: "16px" }}
                      />
                    ),
                    value: "one",
                  },
                  {
                    label: (
                      <RobotOutlined
                        style={{ fontSize: "32px", marginRight: "16px" }}
                      />
                    ),
                    value: "two",
                  },
                  {
                    label: (
                      <AliwangwangOutlined
                        style={{ fontSize: "32px", marginRight: "16px" }}
                      />
                    ),
                    value: "three",
                  },
                  {
                    label: (
                      <CommentOutlined
                        style={{ fontSize: "32px", marginRight: "16px" }}
                      />
                    ),
                    value: "four",
                  },
                  {
                    label: (
                      <CustomerServiceOutlined
                        style={{ fontSize: "32px", marginRight: "16px" }}
                      />
                    ),
                    value: "five",
                  },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group title="显示位置">
              <ProFormRadio.Group
                name="location"
                options={[
                  {
                    label: (
                      <LocationIcon
                        style={{ marginRight: "16px" }}
                        icon={
                          <RadiusUpleftOutlined style={{ fontSize: "24px" }} />
                        }
                        title="左上角"
                      />
                    ),
                    value: "tl",
                  },
                  {
                    label: (
                      <LocationIcon
                        style={{ marginRight: "16px" }}
                        icon={
                          <BorderLeftOutlined style={{ fontSize: "24px" }} />
                        }
                        title="左中角"
                      />
                    ),
                    value: "l",
                  },
                  {
                    label: (
                      <LocationIcon
                        style={{ marginRight: "16px" }}
                        icon={
                          <RadiusBottomleftOutlined
                            style={{ fontSize: "24px" }}
                          />
                        }
                        title="左下角"
                      />
                    ),
                    value: "bl",
                  },
                  {
                    label: (
                      <LocationIcon
                        style={{ marginRight: "16px" }}
                        icon={
                          <RadiusUprightOutlined style={{ fontSize: "24px" }} />
                        }
                        title="右上角"
                      />
                    ),
                    value: "tr",
                  },
                  {
                    label: (
                      <LocationIcon
                        style={{ marginRight: "16px" }}
                        icon={
                          <BorderRightOutlined style={{ fontSize: "24px" }} />
                        }
                        title="右中角"
                      />
                    ),
                    value: "r",
                  },
                  {
                    label: (
                      <LocationIcon
                        style={{ marginRight: "16px" }}
                        icon={
                          <RadiusBottomrightOutlined
                            style={{ fontSize: "24px" }}
                          />
                        }
                        title="右下角"
                      />
                    ),
                    value: "l",
                  },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group title="填写客服微信、QQ号或手机号等">
              <ProFormText
                width="md"
                name="code"
                label="客服联系"
                placeholder="填写客服微信、QQ号或手机号等"
                rules={[
                  {
                    required: true,
                    message: "请输入",
                  },
                ]}
              />
            </ProForm.Group>
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Component;
