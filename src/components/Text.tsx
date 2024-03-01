import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  ForwardRefRenderFunction,
  RefObject,
} from 'react';
import styled from 'styled-components';

interface TextProps extends HTMLAttributes<HTMLElement> {
  text: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

const StyledText = styled.div<{ style?: CSSProperties }>`
  font-family: jakarta-regular;
`;

const Text: ForwardRefRenderFunction<HTMLDivElement, TextProps> = (
  { text, style, as: Element = 'div', ...rest },
  ref,
) => {
  return (
    <StyledText as={Element} ref={ref} style={style} {...rest}>
      {text}
    </StyledText>
  );
};

export default forwardRef(Text);
