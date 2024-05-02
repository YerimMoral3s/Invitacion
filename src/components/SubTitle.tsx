import React from 'react';
import styled from 'styled-components';
import { colors } from '../assets/theme';

const StyledSubTitle = styled.h2`
  rotate: -8deg;
  font-size: 1.8rem;
  font-family: pearl-white;
  color: ${colors.gold};
  margin: 30px 0;

  @media (min-width: 450px) {
    font-size: 2rem;
  }

  @media (min-width: 576px) {
    font-size: 3rem;
  }

  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
`;

type SubTitleProps = {
  text: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

function SubTitle(props: SubTitleProps) {
  const { text, ...rest } = props;
  return <StyledSubTitle {...rest}>{text}</StyledSubTitle>;
}

export default SubTitle;
