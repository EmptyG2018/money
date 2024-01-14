import { DefaultFooter } from "@ant-design/pro-components";
import { useAgentSetting } from "../plugins/agent";

const Component = () => {
  const { agentSetting } = useAgentSetting();
  return !!agentSetting ? (
    <DefaultFooter
      copyright={agentSetting?.copyright || false}
      links={[
        agentSetting?.gwab && {
          key: "gwab",
          title: agentSetting.gwab,
          blankTarget: false,
        },
        agentSetting?.beian && {
          key: "beian",
          title: agentSetting.beian,
          blankTarget: false,
        },
      ]}
    />
  ) : (
    <div style={{ height: 60 }}></div>
  );
};

export default Component;
