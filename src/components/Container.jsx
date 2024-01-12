import { styled, css } from "styled-components";
import { PageContainer as ProPageContainer } from "@ant-design/pro-components";

const GutterLayout = ({ $gutter }) => css`
  padding-block: ${$gutter && $gutter[1] + "px"};
  padding-inline: ${$gutter && $gutter[0] + "px"};
`;

const PageContainerRoot = styled(ProPageContainer)`
  .ant-pro-page-container-children-container {
    ${GutterLayout}
  }
`;

export const PageContainer = (props) => {
  return <PageContainerRoot $gutter={[16, 16]} {...props} />;
};

const ContainerRoot = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1152px;
  margin: 0 auto;
  ${GutterLayout}
`;

export const Container = (props) => {
  return <ContainerRoot {...props} />;
};
