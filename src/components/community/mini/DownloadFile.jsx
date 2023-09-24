import { Card, Button, Space } from "antd-mobile";
import { FolderOutline } from "antd-mobile-icons";
import { styled } from "styled-components";

const ComponentRoot = styled(Card)`
  background-color: #ececec;
  padding: 0 16px;
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
  font-size: 16px;
  line-height: 24px;
`;

const DownloadFileDesc = styled.span`
  font-size: 12px;
  color: #666;
  background-color: #d8d8d8;
  padding: 4px 8px;
  border-radius: 99px;
`;

const Component = ({ name, size, count, disabled, onClick }) => {
  return (
    <ComponentRoot>
      <DownloadFileCard>
        <FolderOutline fontSize={24} />
        <DownloadFileCell>
          <DownloadFileName>{name}</DownloadFileName>
          <Space>
            <DownloadFileDesc>文件大小: {size}</DownloadFileDesc>
          </Space>
        </DownloadFileCell>
      </DownloadFileCard>
      <Button
        block
        color="primary"
        disabled={disabled}
        onClick={(e) => onClick && onClick(e)}
      >
        立即下载
      </Button>
    </ComponentRoot>
  );
};

export default Component;
