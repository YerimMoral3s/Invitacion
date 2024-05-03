import React from 'react';
import styled from 'styled-components';
import { colors } from '../assets/theme';

const StyledSubTitle = styled.h2`
  font-size: 1.4rem;
  font-family: pearl-white;
  color: ${colors.black};
  margin: 10px 0;

  @media (min-width: 450px) {
    font-size: 1.6rem;
  }

  @media (min-width: 576px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 2.2rem;
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
