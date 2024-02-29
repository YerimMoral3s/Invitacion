import { CSSProperties, PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div``;

type ContainerProps = PropsWithChildren & {
  style?: CSSProperties;
};

const Container: React.FC = ({ children, style }: ContainerProps) => {
  return <StyledContainer style={style}>{children}</StyledContainer>;
};

export default Container;
