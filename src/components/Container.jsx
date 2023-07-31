import { styled, css } from "styled-components";
import { PageContainer } from "@ant-design/pro-components";

const ContainerRoot = styled(PageContainer)`
  .ant-pro-page-container-children-container {
    ${({ gutter }) => css`
      padding-block: ${gutter ? gutter[1] + "px" : "0px"};
      padding-inline: ${gutter ? gutter[0] + "px" : "0px"};
    `}
  }
`;

const Component = (props) => {
  return <ContainerRoot {...props} />;
};

export default Component;
