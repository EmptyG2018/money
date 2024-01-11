import { Navigate } from "react-router-dom";
import { useAgentSetting } from "@plugins/agent";

const DEFAULTPATH = "/navigation";

export default () => {
  const { agentSetting } = useAgentSetting();
  return <Navigate to={agentSetting?.goUrl || DEFAULTPATH} replace />;
};
