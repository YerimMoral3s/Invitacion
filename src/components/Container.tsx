import { CSSProperties, PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 1rem;
  margin: 0 auto;

  width: 100%;

  @media (min-width: 576px) {
    width: 90%;

    padding: 1rem 0;
  }

  @media (min-width: 768px) {
    width: 80%;
  }

  @media (min-width: 992px) {
    width: 70%;
  }
`;

type ContainerProps = PropsWithChildren & {
  style?: CSSProperties;
};

const Container = ({ children, style }: ContainerProps) => {
  return (
    <StyledContainer className="container" style={style}>
      {children}
    </StyledContainer>
  );
};

export default Container;
