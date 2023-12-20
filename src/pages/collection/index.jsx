import { Layout } from "antd";
import AsideBar from "./AsideBar";
import Main from "./Main";

export default () => {
  return (
    <Layout
      hasSider
      style={{
        backgroundColor: "#fff",
        height: "100vh",
      }}
    >
      <AsideBar />
      <Main />
    </Layout>
  );
};
