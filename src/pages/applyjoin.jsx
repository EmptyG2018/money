import { useRef } from "react";
import { Button, Card, message } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import {
  ProForm,
  ProFormText,
  ProFormRadio,
  ProFormCheckbox,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import {
  GetSiteVersion,
  GetSiteDomainSuffix,
  GetRandSiteDomainPrefix,
  CreateAgentSite,
} from "../services/agent";
import styled from "styled-components";

const ComponentRoot = styled.div`
  height: 100vh;
  background-color: #1677ff;
`;

const ScrollView = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  &::before,
  &::after {
    display: table;
    content: "";
  }
`;

const FormCard = styled(Card)`
  border-radius: 0px;
  margin-block: 0;
  width: 100%;
  @media (min-width: 576px) {
    & {
      border-radius: 8px;
      margin-block: 24px;
      width: 640px;
    }
  }
`;

const CardTop = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Component = () => {
  const applyjoinForm = useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: versions } = useRequest(GetSiteVersion);
  const { data: domains } = useRequest(GetSiteDomainSuffix);
  const { runAsync: randSiteDomainPrefix } = useRequest(
    GetRandSiteDomainPrefix,
    { manual: true }
  );
  const { runAsync: createAgentSite } = useRequest(CreateAgentSite, {
    manual: true,
  });

  const submit = async () => {
    const fields =
      await applyjoinForm.current.validateFieldsReturnFormatValue();
    const { pass, ...values } = fields;
    if (!pass) return messageApi.warning("需要先同意《会员服务条款》协议");
    try {
      await createAgentSite(values);
      messageApi.success("创建成功！");
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <ComponentRoot>
        <ScrollView>
          <Container>
            <FormCard bordered={false}>
              <CardTop>
                <Title>申请加盟</Title>
              </CardTop>

              <ProForm
                formRef={applyjoinForm}
                layout="horizontal"
                submitter={false}
              >
                <ProFormRadio.Group
                  name="id"
                  label="分站版本"
                  radioType="button"
                  options={(versions?.editionInfo || []).map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  rules={[
                    {
                      required: true,
                      message: "请选择分站版本",
                    },
                  ]}
                />
                <ProFormText
                  width="md"
                  name="webname"
                  label="分站名称"
                  placeholder="请输入网站地址"
                  rules={[
                    {
                      required: true,
                      message: "请输入网站地址",
                    },
                  ]}
                />
                <ProForm.Group title="二级域名" direction="vertical">
                  <ProFormText
                    width="sm"
                    name="domain"
                    label="站点前缀"
                    fieldProps={{
                      suffix: (
                        <SyncOutlined
                          onClick={async () => {
                            const domain = await randSiteDomainPrefix();
                            applyjoinForm.current.setFieldsValue({
                              domain,
                            });
                          }}
                        />
                      ),
                    }}
                    rules={[
                      {
                        required: true,
                        message: "请输入自定前缀",
                      },
                    ]}
                  />
                  <ProFormRadio.Group
                    name="domainId"
                    label="站点后缀"
                    radioType="button"
                    options={(domains || []).map((item) => ({
                      label: item.domain,
                      value: item.id,
                    }))}
                    rules={[
                      {
                        required: true,
                        message: "前选择站点后缀",
                      },
                    ]}
                  />
                </ProForm.Group>
                <ProForm.Group title="账号管理" direction="vertical">
                  <ProFormText
                    width="sm"
                    name="wx"
                    label="绑定微信"
                    rules={[
                      {
                        required: true,
                        message: "请绑定微信",
                      },
                    ]}
                  />
                  <ProFormText
                    width="sm"
                    name="qq"
                    label="绑定QQ"
                    rules={[
                      {
                        required: true,
                        message: "请绑定QQ",
                      },
                    ]}
                  />
                </ProForm.Group>
                <ProFormText.Password
                  width="md"
                  name="code"
                  label="输入卡密"
                  rules={[
                    {
                      required: true,
                      message: "请输入卡密",
                    },
                  ]}
                />
                <ProFormCheckbox name="pass">
                  支付即视为您同意《会员服务条款》
                </ProFormCheckbox>
                <Button type="primary" onClick={submit}>
                  创建分站
                </Button>
              </ProForm>
            </FormCard>
          </Container>
        </ScrollView>
      </ComponentRoot>
    </>
  );
};

export default Component;
