import { SpinLoading } from "antd-mobile";
import { styled } from "styled-components";

const ComponentRoot = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Component = () => {
  return (
    <ComponentRoot>
      <SpinLoading />
    </ComponentRoot>
  );
};

export default Component;
