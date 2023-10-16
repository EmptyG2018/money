import { useRef } from "react";
import { Button, message } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import {
  ProForm,
  ProFormText,
  ProFormRadio,
  ProFormCheckbox,
  ProCard,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import {
  GetSiteVersion,
  GetSiteDomainSuffix,
  GetRandSiteDomainPrefix,
  CreateAgentSite,
} from "../services/agent";
import Container from "../components/Container";

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
      <Container title={false} gutter={[12, 24]}>
        <ProCard title="申请加盟" layout="center">
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
        </ProCard>
      </Container>
    </>
  );
};

export default Component;
