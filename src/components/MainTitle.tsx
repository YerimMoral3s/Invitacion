import React from 'react';
import styled from 'styled-components';
import { colors } from '../assets/theme';

const StyledMainTitle = styled.h2`
  rotate: -8deg;
  font-size: 2rem;
  font-family: pearl-white;
  color: ${colors.gold};
  margin: 30px 0;
  max-width: 90%;

  align-self: center;

  @media (min-width: 450px) {
    font-size: 2.2rem;
  }

  @media (min-width: 576px) {
    font-size: 3.2rem;
  }

  @media (min-width: 768px) {
    font-size: 3.4rem;
  }
`;

type MainTitleProps = {
  text: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

function MainTitle(props: MainTitleProps) {
  const { text, ...rest } = props;
  return <StyledMainTitle {...rest}>{text}</StyledMainTitle>;
}

export default MainTitle;
