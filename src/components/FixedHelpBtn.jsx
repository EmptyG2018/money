import { Link } from "react-router-dom";
import { FloatButton, Image } from "antd";
import { useRequest } from "ahooks";
import { GetAgentHelpIconShow } from "@services/setting";
import styled from "styled-components";

const LocationStyleMap = {
  8: { top: "72px", left: "24px", right: "initial", bottom: "initial" },
  9: { top: "72px", left: "initial", right: "24px", bottom: "initial" },
  10: {
    top: 0,
    left: "24px",
    right: "initial",
    bottom: 0,
    marginBlock: "auto",
  },
  11: {
    top: 0,
    left: "initial",
    right: "24px",
    bottom: 0,
    marginBlock: "auto",
  },
  12: { top: "initial", left: "24px", right: "initial", bottom: "72px" },
  13: { top: "initial", left: "initial", right: "24px", bottom: "72px" },
};

const Navigate = styled(Link)`
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

const FloatButtonRoot = styled(FloatButton)`
  .ant-float-btn-body {
    .ant-float-btn-content {
      padding: 0;
      width: 100%;
      height: 100%;
      .ant-float-btn-icon {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export default () => {
  const { data: helpSetting } = useRequest(GetAgentHelpIconShow);
  const locationStyle = LocationStyleMap[helpSetting?.styleType];
  const show = helpSetting?.state === 1 && locationStyle;

  return (
    show && (
      <Navigate to="/help">
        <FloatButtonRoot
          shape="circle"
          icon={
            <Image
              style={{ width: "100%", height: "100%" }}
              src={helpSetting?.iconValue}
              preview={false}
            />
          }
          style={locationStyle}
        />
      </Navigate>
    )
  );
};
