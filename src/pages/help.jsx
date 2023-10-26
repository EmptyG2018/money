import { Space, Image } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { styled } from "styled-components";
import { useRequest } from "ahooks";
import { GetAgentHelpMethods } from "../services/setting";

const ComponentRoot = styled.div`
  &::before {
    display: table;
    content: "";
  }
`;

const SubTitle = styled.p`
  margin: 0;
  padding: 0;
  margin-block-start: -12px;
  margin-block-end: 16px;
  color: #4d4d4d;
`;

const Content = styled.div`
  margin-top: 120px;
  max-width: 840px;
  margin-inline: auto;
  padding-inline: 24px;
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  gap: 8px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
`;

const Component = () => {
  const { data: helpMethods } = useRequest(GetAgentHelpMethods);

  return (
    <ComponentRoot>
      <Content>
        <ProCard
          title="联系我们"
          bordered
          direction="column"
          style={{ background: "#f5f5f5" }}
        >
          <SubTitle>使用过程中遇到任何问题，请联系我们哦</SubTitle>
          <Space size={24} wrap>
            {(helpMethods || []).map((item) => (
              <Contact key={item.id}>
                {item.url ? (
                  <Image
                    src={item.url}
                    width={124}
                    height={124}
                    preview={false}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "124px",
                      height: "124px",
                      fontSize: "14px",
                      background: "#f5f5f5",
                      color: "#666",
                    }}
                  >
                    未上传
                  </div>
                )}
                <Title>
                  <Space>
                    <Image
                      src={item.accountTypeUrl}
                      width={18}
                      height={18}
                      preview={false}
                    />
                    {item.textvalue}
                  </Space>
                </Title>
              </Contact>
            ))}
          </Space>
        </ProCard>
      </Content>
    </ComponentRoot>
  );
};

export default Component;
