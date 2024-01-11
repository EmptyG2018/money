import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAgent } from "../stores/settingReducer";
import storage from "store";
import { useRequest } from "ahooks";

import { Result, Button, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import FullLoading from "../components/FullLoading";

import { GetAgentGlobalSetting } from "../services/setting";
import useSEO from "../hooks/seo";

/**
 * @title 代理商失败提示
 */
export const AgentError = () => {
  return (
    <Result
      status="error"
      title="获取站点配置异常"
      subTitle="请在重新提交之前检查并修改以下信息。"
      extra={[
        <Button type="primary" key="get" onClick={() => location.reload()}>
          重新加载
        </Button>,
      ]}
    >
      <div className="desc">
        <Typography.Paragraph>
          <Typography.Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            出现异常的原因有以下几种：
          </Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" />
          &nbsp;网络异常，请检查网络连接
        </Typography.Paragraph>
        <Typography.Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" />
          &nbsp;信号网络不稳定，请到空旷处重试
        </Typography.Paragraph>
      </div>
    </Result>
  );
};

/**
 * @title 全局代理商
 * @param {React.ReactNode} [element] 路由页面
 */
export const Agent = ({ element }) => {
  const [own, setOwn] = useState(false);
  const { agentSetting, setAgentSetting } = useAgentSetting();

  const {
    run: getAgentSetting,
    data,
    error,
  } = useRequest(GetAgentGlobalSetting, {
    manual: true,
    onSuccess(res) {
      setAgentSetting(res);
    },
  });

  useSEO({
    ico: agentSetting?.webicoUrl,
    title: agentSetting?.webname,
    keywords: agentSetting?.keywords,
    description: agentSetting?.description,
  });

  useEffect(() => {
    if (!data) {
      const isOwn = agentSetting && agentSetting?.domain === location.hostname;
      isOwn ? setOwn(isOwn) : getAgentSetting(location.hostname);
    }
  }, [data, agentSetting]);

  if (own || data) return element;
  if (error) return <AgentError />;
  return <FullLoading />;
};

// 代理商配置 hook
export const useAgentSetting = () => {
  const dispatch = useDispatch();
  const { agent } = useSelector(({ setting }) => setting);

  const setAgentSetting = (setting) => {
    storage.set("agent", setting);
    dispatch(setAgent(setting));
  };

  const clearAgentSetting = () => {
    storage.remove("agent");
    dispatch(setAgent(null));
  };

  return { agentSetting: agent, setAgentSetting, clearAgentSetting };
};
