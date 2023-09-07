import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAgent } from "../stores/settingReducer";
import storage from "store";
import { useRequest } from "ahooks";

import { Result, Button, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import FullLoading from "../components/FullLoading";

import { GetAgentGlobalSetting } from "../services/setting";
import { useSEO } from "../hooks/seo";

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
        <Button type="primary" key="get">
          重新获取
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
  const initial = useRef(true);
  const [own, setOwn] = useState(false);
  const { agentSetting, setAgentSetting } = useAgentSetting();
  const { seo } = useSEO();

  const {
    run: getAgentSetting,
    loading,
    error,
  } = useRequest(GetAgentGlobalSetting, {
    manual: true,
    onSuccess(res) {
      const { webname, keywords, description } = res;
      seo({
        title: webname,
        keywords,
        description,
      });
      setAgentSetting(res);

      initial.current = false;
    },
  });

  useEffect(() => {
    if (initial.current) {
      const isOwn = agentSetting && agentSetting?.domain === location.hostname;
      isOwn ? setOwn(isOwn) : getAgentSetting(location.hostname);
    }
  }, [agentSetting]);

  if (own) return element;
  if (error) return <AgentError />;
  if (loading) return <FullLoading />;
  return element;
};

// 代理商配置 hook
export const useAgentSetting = () => {
  const dispatch = useDispatch();
  const { agent } = useSelector(({ setting }) => setting);

  const setAgentSetting = (setting) => {
    storage.set("agent", setting);
    dispatch(setAgent(setting));
  };

  return { agentSetting: agent, setAgentSetting };
};
