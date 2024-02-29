import React, { CSSProperties } from 'react';
import styled from 'styled-components';

interface TextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string;
  style?: CSSProperties;
}

const StyledH1 = styled.h1<{ style?: CSSProperties }>`
  font-family: jakarta-regular;
  font-size: 40px;
`;
export const H1: React.FC<TextProps> = ({ text, style, ...rest }) => {
  return (
    <StyledH1 style={style} {...rest}>
      {text}
    </StyledH1>
  );
};

const StyledH2 = styled.h2<{ style?: CSSProperties }>`
  font-family: jakarta-regular;
  font-size: 32px;
`;

export const H2: React.FC<TextProps> = ({ text, style, ...rest }) => {
  return (
    <StyledH2 style={style} {...rest}>
      {text}
    </StyledH2>
  );
};

const StyledH3 = styled.h3<{ style?: CSSProperties }>`
  font-family: jakarta-regular;
  font-size: 24px;
`;

export const H3: React.FC<TextProps> = ({ text, style, ...rest }) => {
  return (
    <StyledH3 style={style} {...rest}>
      {text}
    </StyledH3>
  );
};

const StyledH4 = styled.h4<{ style?: CSSProperties }>`
  font-family: jakarta-regular;
  font-size: 20px;
`;

export const H4: React.FC<TextProps> = ({ text, style, ...rest }) => {
  return (
    <StyledH4 style={style} {...rest}>
      {text}
    </StyledH4>
  );
};

const StyledP = styled.p<{ style?: CSSProperties }>`
  font-family: jakarta-regular;
  font-size: 16px;
`;
export const P: React.FC<TextProps> = ({ text, style, ...rest }) => {
  return (
    <StyledP style={style} {...rest}>
      {text}
    </StyledP>
  );
};

const StyledSpan = styled.span<{ style?: CSSProperties }>`
  font-family: jakarta-regular;
  font-size: 16px;
`;

export const Span: React.FC<TextProps> = ({ text, style, ...rest }) => {
  return (
    <StyledSpan style={style} {...rest}>
      {text}
    </StyledSpan>
  );
};

const StyledLabel = styled.label<{ style?: CSSProperties }>`
  font-family: jakarta-regular;
  font-size: 16px;
`;

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  style?: CSSProperties;
}

export const Label: React.FC<LabelProps> = ({ text, style, ...rest }) => {
  return (
    <StyledLabel style={style} {...rest}>
      {text}
    </StyledLabel>
  );
};
