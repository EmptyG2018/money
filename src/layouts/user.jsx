import { useLocation, Outlet, useOutlet, Link } from "react-router-dom";
import { Avatar } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useUser } from "../hooks/user";
import { styled } from "styled-components";
import {
  GetUserOpenVipGroupList,
} from "../services/vip";
import {useRequest} from "ahooks";
import {Fragment} from "react";
const menus = [
  {
    path: "/user/info",
    title: "基本信息",
  },
  {
    path: "/user/editpwd",
    title: "修改密码",
  },
  {
    path: "/buykey",
    title: "开通会员",
  },
  {
    path: "/applyjoin",
    title: "申请加盟",
  },
];

const TabbarRoot = styled.div`
  height: 56px;
  margin-bottom: 8px;
  @media (min-width: 768px) {
    display: none;
  }
`;

const TabbarWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  position: fixed;
  align-items: center;
  width: 100%;
  height: 56px;
  background-color: #fff;
  padding-inline: 16px;
  font-size: 16px;
`;

const TabbarBack = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Tabbar = ({ title, onBack, ...props }) => {
  return (
    <TabbarRoot {...props}>
      <TabbarWrap>
        <TabbarBack
          onClick={(e) => {
            onBack && onBack(e);
          }}
        >
          <LeftOutlined />
          {title}
        </TabbarBack>
      </TabbarWrap>
    </TabbarRoot>
  );
};

const MainView = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  @media (min-width: 768px) {
    position: relative;
    border-radius: 6px;
    width: initial;
    flex: 1 0 0;
    width: 0;
  }
`;

const MainContainer = styled.div`
  flex: 1 0 0;
  height: 0;
  overflow-y: auto;
  @media (min-width: 768px) {
    flex-basis: initial;
    flex-grow: initial;
    flex-shrink: initial;
    height: initial;
    overflow-y: initial;
    border-radius: 6px;
    overflow: hidden;
  }
`;

const ComponentRoot = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Container = styled.div`
  box-sizing: border-box;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0;
  @media (min-width: 768px) {
    padding: 16px;
  }
`;

const UserHeader = styled.div`
  border-radius: 0;
  background-color: #fff;
  overflow: hidden;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    border-radius: 8px;
  }
`;

const UserBg = styled.img`
  display: block;
  width: 100%;
  height: 120px;
  @media (min-width: 768px) {
    height: 160px;
  }
`;

const UserProfile = styled.div`
  padding-inline: 24px;
  padding-block: 16px;
  margin-top: -48px;
  @media (min-width: 768px) {
    padding-inline: 48px;
  }
`;

const UserAvatar = styled(Avatar)`
  margin-right: 16px;
  border: 1px solid #eee;
`;

const UserName = styled.span`
  position: relative;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  top: 18px;
`;

const UserMain = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const UserCellCard = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 8px 0;
  @media (min-width: 768px) {
    width: 280px;
    border-radius: 8px;
  }
`;


const UserVip = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 8px 0;
  @media (min-width: 768px) {
    width: 280px;
    border-radius: 8px;
  }
`;

const UserCellItem = styled(Link)`
  display: flex;
  padding: 0 16px;
  font-size: 16px;
  line-height: 40px;
  justify-content: space-between;
  align-items: center;
  color: initial;
  text-decoration: none;
`;
const GroupInfo = styled.div`
  font-size: 12px;
  color: #ece0e0;
  border-radius: 5px;
  margin-block-end: 16px;
  width:100%;
  padding: 10px 0px;
  background: linear-gradient(300deg,#4c4d51,#2a2a31 15%,#85858a 40%,#393a3c 60%,#393838 80%,#5e5f62 100%);
  text-align: center;
`;
const StyleModuleImg = styled.img`
    height: 1em;
    vertical-align: -.15em;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: inline-block;
    margin-right: 6px;
`;
const StyleTime = styled.span`
        font-size: .9em;
    padding: .2em 6px;
    vertical-align: -.1em;
    color:#ffffff;
      background: linear-gradient(135deg, #f59f54 10%, #ff6922 100%);
      margin-left:5px;
`;

const Component = () => {
  const location = useLocation();
  const { user } = useUser();
  const outlet = useOutlet();

  const checkedMenu = menus.find((item) => item.path === location.pathname);
  const {data: vipOpenVipGroupList } = useRequest(
      () => GetUserOpenVipGroupList()
  );
  return (
    <ComponentRoot>
      <Container>
        <UserHeader>
          <UserBg
            src="https://t.yyiii.com/wp-content/themes/zibll/img/user_t.jpg"
            object-fit="cover"
          />
          <UserProfile>
            <UserAvatar src={user?.photoUrl} size={84} />
            <UserName>
              {user ? (
                user.username
              ) : (
                <Link
                  to="/login"
                  style={{ color: "initial", textDecoration: "none" }}
                >
                  请登录
                </Link>
              )}
            </UserName>
          </UserProfile>
        </UserHeader>
        <UserVip>
          {(vipOpenVipGroupList || []).map((item) => (
              <GroupInfo>
                <StyleModuleImg  src={item.icon} />

                {item.groupTitle}
                {item.endTime != "" && (
                <StyleTime>
                  {item.endTime}
                </StyleTime>
                )}
              </GroupInfo>
          ))}


        </UserVip>
        <UserMain>

          <UserCellCard>
            {menus.map((item) => (
              <UserCellItem to={item.path} key={item.path}>
                {item.title}
                <RightOutlined />
              </UserCellItem>
            ))}
          </UserCellCard>
          {outlet && (
            <MainView>
              <Tabbar
                title={checkedMenu ? checkedMenu.title : "个人中心"}
                onBack={() => history.back()}
              ></Tabbar>
              <MainContainer>
                <Outlet />
              </MainContainer>
            </MainView>
          )}
        </UserMain>
      </Container>
    </ComponentRoot>
  );
};

export default Component;
