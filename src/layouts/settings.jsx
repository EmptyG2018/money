import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Menu } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { styled } from "styled-components";
import Container from "../components/Container";

const AsideMenu = styled(Menu)`
  border-inline-end-color: transparent !important;
`;

const Component = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      label: "基本信息",
      key: "/settings/info",
    },
    {
      label: "修改密码",
      key: "/settings/editpwd",
    },
  ];

  const currentMenu = items.find((item) => item.key === location.pathname);

  return (
    <div>
      <Container title={false} gutter={[0, 12]}>
        <ProCard gutter={[24, 24]} wrap ghost>
          <ProCard colSpan={{ xs: 24, md: 6 }}>
            <AsideMenu
              defaultSelectedKeys={[location.pathname]}
              items={items}
              onSelect={(item) => navigate(item.key)}
            />
          </ProCard>
          <ProCard colSpan={{ xs: 24, md: 18 }} title={currentMenu?.label}>
            <Outlet />
          </ProCard>
        </ProCard>
      </Container>
    </div>
  );
};

export default Component;
