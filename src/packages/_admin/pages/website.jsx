import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Space, message, notification } from "antd";
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { useUser } from "@hooks/user";
import { useAgentSetting } from "@plugins/agent";
import { useRequest } from "ahooks";
import { UploadFile } from "@services/upload";
import {
  GetAdminAgentGlobalSetting,
  UpdateAdminAgentGlobalSetting,
} from "@services/setting";
import { PageContainer } from "@components/Container";

const Component = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [notApi, notContextHolder] = notification.useNotification();
  const [msgApi, msgContextHolder] = message.useMessage();
  const { logout } = useUser();
  const { clearAgentSetting } = useAgentSetting();
  const { data: helpSetting } = useRequest(GetAdminAgentGlobalSetting);
  const { runAsync: updateAdminAgentGlobalSetting } = useRequest(
    UpdateAdminAgentGlobalSetting,
    { manual: true }
  );
  const { runAsync: uploadAssets } = useRequest(UploadFile, { manual: true });

  useEffect(() => {
    formRef.current.setFieldsValue({
      weblogoUrl: helpSetting?.weblogoUrl
        ? [{ uid: "-1", url: helpSetting?.weblogoUrl, status: "done" }]
        : [],
      webicoUrl: helpSetting?.webicoUrl
        ? [{ uid: "-1", url: helpSetting?.webicoUrl, status: "done" }]
        : [],
      webname: helpSetting?.webname,
      keywords: helpSetting?.keywords,
      description: helpSetting?.description,
      gwab: helpSetting?.gwab,
      beian: helpSetting?.beian,
      copyright: helpSetting?.copyright,
    });
  }, [helpSetting]);

  const uploadIco = async (e) => {
    const formData = new FormData();
    formData.append("imgType", 0);
    formData.append("myFile", e.file);
    try {
      const res = await uploadAssets(formData);
      formRef.current.setFieldsValue({
        webicoUrl: [{ uid: "-1", status: "done", url: res?.fullUrl }],
      });
    } catch (err) {
      msgApi.error(err.message);
    }
    return false;
  };

  const uploadLogo = async (e) => {
    const formData = new FormData();
    formData.append("imgType", 0);
    formData.append("myFile", e.file);
    try {
      const res = await uploadAssets(formData);
      formRef.current.setFieldsValue({
        weblogoUrl: [{ uid: "-1", status: "done", url: res?.fullUrl }],
      });
    } catch (err) {
      msgApi.error(err.message);
    }
    return false;
  };

  const submit = async ({ weblogoUrl, webicoUrl, ...values }) => {
    try {
      await updateAdminAgentGlobalSetting({
        weblogoUrl: weblogoUrl[0].url,
        webicoUrl: webicoUrl.length ? webicoUrl[0].url : undefined,
        ...values,
      });
      msgApi.success("保存成功");
      notApi.success({
        key: "update_website_config",
        message: "保存成功！",
        description: "保存后，需要重新登录才可生效",
        closeIcon: false,
        duration: -1,
        btn: (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => notApi.destroy("update_website_config")}
            >
              暂时不需要
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                logout();
                clearAgentSetting();
                navigate("/login", { replace: true });
                notApi.destroy("update_website_config");
                location.reload();
              }}
            >
              立即生效
            </Button>
          </Space>
        ),
      });
    } catch (err) {
      msgApi.error(err.message);
    }
  };

  return (
    <>
      {notContextHolder}
      {msgContextHolder}
      <PageContainer
        fixedHeader
        header={{
          title: "网站管理",
          style: { background: "#fff" },
        }}
      >
        <ProCard>
          <ProForm
            formRef={formRef}
            layout="vertical"
            onFinish={submit}
            submitter={{
              render: (props, dom) => {
                return (
                  <Space direction="vertical">
                    <Button type="primary" htmlType="submit">
                      保存
                    </Button>
                    <Typography.Text type="danger">
                      保存后，需要重新登录才可生效。
                    </Typography.Text>
                  </Space>
                );
              },
            }}
          >
            <ProFormUploadButton
              name="weblogoUrl"
              label="网站Logo"
              max={1}
              extra="支持jpg, png, gif, jpeg类型图片，尺寸建议128x128"
              fieldProps={{
                listType: "picture-card",
                multiple: false,
                customRequest: uploadLogo,
              }}
              rules={[
                {
                  required: true,
                  message: "请上传网站Logo",
                },
              ]}
            />
            <ProFormUploadButton
              name="webicoUrl"
              label="ico图标"
              tooltip="用于浏览器tab选项卡图标"
              max={1}
              extra="支持同上类型图片，尺寸支持三种16x16、32x32、48x48"
              fieldProps={{
                listType: "picture-card",
                multiple: false,
                customRequest: uploadIco,
              }}
            />
            <ProFormText
              width="sm"
              name="webname"
              label="网站名称"
              placeholder="网站名称"
              rules={[
                {
                  required: true,
                  message: "请输入网站名称",
                },
              ]}
            />
            <ProFormTextArea
              width="lg"
              name="keywords"
              label="网站关键词"
              tooltip="建议填写，搜索引擎会根据关键词权重优化排名，有助于SEO搜索优化"
              placeholder="网站关键词"
            />
            <ProFormTextArea
              width="lg"
              name="description"
              label="网站描述"
              tooltip="建议填写，描述网站主营业务对搜索引擎检索分类，有助于SEO搜索优化"
              placeholder="网站描述"
            />
            <ProFormText
              width="lg"
              name="gwab"
              label="公网备案号"
              placeholder="公网备案号"
            />
            <ProFormText
              width="lg"
              name="beian"
              label="备案号"
              placeholder="备案号"
            />
            <ProFormText
              width="lg"
              name="copyright"
              label="版权号"
              placeholder="版权号"
            />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Component;
