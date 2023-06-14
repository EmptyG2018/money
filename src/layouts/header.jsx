import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
} from "@ant-design/pro-components";
import { ConfigProvider, Divider, Dropdown, Input, Popover, theme } from "antd";
import { styled } from "styled-components";
import React, { useState } from "react";
import defaultProps from "./_defaultProps";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [num, setNum] = useState(40);
  if (typeof document === "undefined") {
    return <div />;
  }
  return (
    <div
      id="layout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById("layout") || document.body;
          }}
        >
          <ProLayout
            prefixCls="my-prefix"
            logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="Github"
            {...defaultProps}
            location={{
              pathname: location.pathname,
            }}
            token={{
              header: {
                colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
              },
            }}
            avatarProps={{
              src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
              size: "small",
              title: "七妮妮",
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "logout",
                          icon: <LogoutOutlined />,
                          label: "退出登录",
                        },
                      ],
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {dom}
              </div>
            )}
            contentStyle={{ padding: 0 }}
          >
            <Outlet />
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};
