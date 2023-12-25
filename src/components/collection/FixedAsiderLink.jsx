import { NavLink } from "react-router-dom";
import { StarOutlined, TeamOutlined } from "@ant-design/icons";
import styled from "styled-components";

const FixedAsiderLinkRoot = styled.div`
  border-top: 1px solid rgb(230, 230, 230);
  background-color: #ebebeb;
`;

const NavItem = styled(NavLink)`
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 16px 0 24px;
  color: #333 !important;
  &:hover,
  &.active {
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

export default () => {
  return (
    <FixedAsiderLinkRoot>
      <NavItem to="/collection/my">
        <StarOutlined style={{ marginRight: 4 }} />
        我的收藏
      </NavItem>
      <NavItem to="/collection/team">
        <TeamOutlined style={{ marginRight: 4 }} />
        我的团队
      </NavItem>
    </FixedAsiderLinkRoot>
  );
};
