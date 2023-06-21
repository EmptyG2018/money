import { Affix, Menu } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Outlet } from "react-router-dom";

const Component = () => {
  const items = [
    {
      label: "基本信息",
      key: "www",
    },
    {
      label: "修改密码",
      key: "www1",
    },
  ];

  return (
    <div>
      <PageContainer title={false}>
        <ProCard wrap>
          <ProCard colSpan={{ xs: 24, sm: 6 }}>
            <Menu items={items} />
          </ProCard>
          <Outlet />
        </ProCard>
      </PageContainer>
    </div>
  );
};

export default Component;
