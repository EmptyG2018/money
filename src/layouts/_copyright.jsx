import { DefaultFooter } from "@ant-design/pro-components";
import { useAgentSetting } from "../plugins/agent";

const Component = () => {
  const { agentSetting } = useAgentSetting();
  return (
    <DefaultFooter
      copyright={agentSetting?.copyright}
      links={[
        {
          key: "gwab",
          title: agentSetting?.gwab,
          blankTarget: false,
        },
        {
          key: "beian",
          title: agentSetting?.beian,
          blankTarget: false,
        },
      ]}
    />
  );
};

export default Component;
