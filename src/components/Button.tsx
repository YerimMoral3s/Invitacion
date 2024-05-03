import React from 'react';
import styled from 'styled-components';
import { colors } from '../assets/theme';

const StyledButton = styled.a`
  background-color: ${colors.green};
  color: ${colors.white};
  border: 0;
  border-radius: 0;
  cursor: pointer;
  outline: none;

  width: 100%;
  max-width: 300px;
  padding: 5px 15px;
  font-size: 1.5rem;

  font-family: rosarivo-italic;
  text-transform: uppercase;

  text-decoration: none;

  &:active {
    opacity: 0.5;
    transition: opacity 0.3s;
  }
`;

type ButtonProps = {
  text: string;
} & React.HTMLProps<HTMLAnchorElement>;

function Button(props: ButtonProps) {
  const { text, ...rest } = props;
  return <StyledButton {...rest}>{text}</StyledButton>;
}

export default Button;
