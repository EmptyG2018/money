import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { styled } from "styled-components";

const ComponentRoot = styled.div`
  padding-block: 40px;
`;

const Component = () => {
  const navigate = useNavigate();
  return (
    <ComponentRoot>
      <Result
        status="403"
        title="403"
        subTitle="对不起，您没有权限访问此页面。"
        extra={
          <Button
            type="primary"
            onClick={() => navigate("/", { replace: true })}
          >
            回到首页
          </Button>
        }
      />
    </ComponentRoot>
  );
};

export default Component;
