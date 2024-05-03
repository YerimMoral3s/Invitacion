import React from 'react';
import styled from 'styled-components';

type ImagenProps = React.HTMLAttributes<HTMLImageElement>;

const StyledImagen = styled.img``;

export default function Imagen(props: ImagenProps) {
  return <StyledImagen {...props} />;
}
