import { CSSProperties, PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 2rem 1rem;
  margin: 0 auto;

  width: 100%;

  @media (min-width: 768px) {
    width: 90%;
  }

  @media (min-width: 992px) {
    width: 80%;
  }
`;

type ContainerProps = PropsWithChildren & {
  style?: CSSProperties;
} & React.HTMLProps<HTMLDivElement>;

const Container = ({ children, style, ...rest }: ContainerProps) => {
  return (
    <StyledContainer className="container" style={style} {...rest}>
      {children}
    </StyledContainer>
  );
};

export default Container;
