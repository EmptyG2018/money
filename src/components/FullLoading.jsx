import { Spin } from "antd";
import { styled } from "styled-components";

const ComponentRoot = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const Component = ({ ...props }) => {
  return (
    <ComponentRoot>
      <Spin {...props} />
    </ComponentRoot>
  );
};

export default Component;
