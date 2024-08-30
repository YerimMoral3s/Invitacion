import React from 'react';
import styled from 'styled-components';
import { colors } from './theme';
import Container from './Container';
import IrvinYSonia from './IrvinYSonia';

const Styled = styled.div`
  background: ${colors.gray};
  color: ${colors.white};
  .container {
    display: flex;
    align-content: center;
    font-size: 1.2rem;
    flex-direction: column;
    align-items: center;
    text-align: center;
    letter-spacing: 5px;
    svg {
      max-width: 100%;
      width: 100%;
      margin: 1.5rem 0;
    }
    .line {
      width: 100%;
      height: 2px;
      background: ${colors.white};
      margin: 1rem 0;
    }
  }
`;

export default function Nosotros() {
  return (
    <Styled>
      <Container>
        <p>NOSOTROS</p>
        <IrvinYSonia />
        <p>TENEMOS EL PLACER DE INVITARLOS A</p>
        <br />
        <p style={{ fontWeight: 'bold' }}>NUESTRA BODA</p>
        <br />
        <p>QUE SE CELEBRARA EL PROXIMO</p>
        <div className="line"></div>
        <p style={{ fontSize: '3rem' }}>MARZO</p>
        <div className="line"></div>
        <p style={{ fontSize: '3rem' }}>2025</p>
      </Container>
    </Styled>
  );
}
