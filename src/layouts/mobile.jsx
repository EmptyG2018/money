import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

const ComponentRoot = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Component = () => {
  return (
    <ComponentRoot>
      <Outlet />
    </ComponentRoot>
  );
};

export default Component;
