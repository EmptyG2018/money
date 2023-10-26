import { Space } from "antd";
import { FileOutlined } from "@ant-design/icons";
import styled, { css } from "styled-components";

const ComponentRoot = styled.div`
  max-width: 420px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-primary);
  gap: 24px;
  padding: 16px;
  border-radius: 6px;
`;

const DownloadFileCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #505050;
  margin-bottom: 16px;
`;

const DownloadFileCell = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  width: 0;
  gap: 8px;
`;

const DownloadFileName = styled.div`
  color: #333;
  font-size: 16px;
  line-height: 24px;
`;

const DownloadFileDesc = styled.span`
  font-size: 12px;
  color: #838383;
  background-color: var(--color-tag);
  padding: 4px 8px;
  border-radius: 99px;
`;

const Component = ({ state = "primary", name, size, children }) => {
  const stateMap = {
    primary: {
      "--color-primary": "#1677ff",
      "--color-bg": "#f0f6ff",
      "--color-tag": "#dfecff",
    },
    warning: {
      "--color-primary": "#ff8f1f",
      "--color-bg": "#fff5ec",
      "--color-tag": "#ffe9d3",
    },
  };

  const cssVar = stateMap[state] ? stateMap[state] : stateMap["primary"];

  return (
    <ComponentRoot style={cssVar}>
      <DownloadFileCard>
        <FileOutlined style={{ position: "relative", top: 4, fontSize: 20 }} />
        <DownloadFileCell>
          <DownloadFileName>{name}</DownloadFileName>
          <Space>
            <DownloadFileDesc>文件大小: {size}</DownloadFileDesc>
          </Space>
        </DownloadFileCell>
      </DownloadFileCard>
      {children}
    </ComponentRoot>
  );
};

export default Component;
