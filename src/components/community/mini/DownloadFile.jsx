import { Card, Space } from "antd-mobile";
import { FolderOutline } from "antd-mobile-icons";
import { styled } from "styled-components";

const ComponentRoot = styled(Card)`
  background-color: var(--color-bg);
  padding: 0 16px;
  border: 1px solid var(--color-primary);
  .adm-card-body {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px 0;
  }
`;

const DownloadFileCard = styled.div`
  display: flex;
  gap: 8px;
  color: #505050;
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
  font-weight: 600;
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
        <FolderOutline fontSize={24} color="#333" />
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
