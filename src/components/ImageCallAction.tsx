import React from 'react';
import Container from './Container';
import Button from './Button';
import styled from 'styled-components';

type ImageCallActionProps = {
  image: string;
  alt: string;
  buttonText: string;
  href: string;

  imageStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
};

const StyledImageCallAction = styled.div`
  width: 100%;
  text-align: center;

  margin-bottom: 1rem;

  .container-ImageCallAction {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      max-width: 600px;
      height: 300px;
      margin: 0 auto;
      object-fit: contain;
    }

    a {
      width: 100%;
    }
  }
`;

const ImageCallAction = (props: ImageCallActionProps) => {
  const { image, alt, buttonText, href, imageStyle, buttonStyle } = props;

  return (
    <StyledImageCallAction>
      <Container className="container-ImageCallAction">
        <img src={image} alt={alt} style={imageStyle} />
        <Button
          text={buttonText}
          href={href}
          target="_blank"
          style={buttonStyle}
        />
      </Container>
    </StyledImageCallAction>
  );
};

export default ImageCallAction;
