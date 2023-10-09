import { Button, Space } from "antd";
import { FileOutlined } from "@ant-design/icons";
import { styled } from "styled-components";

const ComponentRoot = styled.div`
  width: 420px;
  background-color: #ececec;
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

const Component = ({ name, size, disabled, ...props }) => {
  return (
    <ComponentRoot>
      <DownloadFileCard>
        <FileOutlined style={{ position: "relative", top: 4, fontSize: 20 }} />
        <DownloadFileCell>
          <DownloadFileName>{name}</DownloadFileName>
          <Space>
            <DownloadFileDesc>文件大小: {size}</DownloadFileDesc>
          </Space>
        </DownloadFileCell>
      </DownloadFileCard>
      <Button type="primary" disabled={disabled} {...props} />
    </ComponentRoot>
  );
};

export default Component;
