import NotData from "@/assets/no_data.svg";
import styled from "styled-components";

const NotDataContainer = styled.div`
  padding: 64px 24px;
  width: 100%;
  text-align: center;
  @media (min-width: 768px) {
    padding: 128px 48px;
  }
  img {
    max-width: 100%;
  }
`;

const Component = ({ ...props }) => {
  return (
    <NotDataContainer {...props}>
      <img src={NotData} />
    </NotDataContainer>
  );
};

export default Component;
