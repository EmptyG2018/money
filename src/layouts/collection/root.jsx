import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import FavoriteAsider from "@components/collection/FavoriteAsider";
import styled from "styled-components";

const LayoutRoot = styled(Layout)`
  background-color: #fff;
  height: 100vh;
`;

export default () => {
  return (
    <LayoutRoot>
      <FavoriteAsider />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </LayoutRoot>
  );
};
