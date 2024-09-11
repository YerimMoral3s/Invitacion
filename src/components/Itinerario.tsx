import { useState } from 'react';
import styled from 'styled-components';
import Container from './Container';
import { colors } from './theme';

const StyledItinerario = styled.div`
  background: ${colors.cream};
  font-family: 'Montserrat', sans-serif;

  h1,
  h2,
  h3 {
    font-weight: normal;
  }
`;

export default function Itinerario() {
  return (
    <StyledItinerario>
      <Container>
        <h1 style={{ letterSpacing: '5px' }}>ITINERARIO</h1>
      </Container>
      <Date
        date="SABADO 01/18:30 HRS"
        ceremony="CEREMONIA CIVIL"
        address="Av. Gobernador Alfredo del Mazo Mz. 76 Lt. 38, Villa de Guadalupe Xalostoc, Ecatepec de Morelos."
        a="https://maps.app.goo.gl/mtk1zwA3hEZNhh399"
        dressCode="DRESS CODE: COCTEL"
      />
      <div style={{ marginTop: '2rem' }}>
        <Date
          date="SABADO 15/16:30 HRS"
          ceremony="CEREMONIA RELIGIOSA"
          address="Av. López Mateos No. 1, Huaxtla, Jal."
          a="https://maps.app.goo.gl/VbupyS3sUY2ePacf6"
          dressCode="DRESS CODE: FORMAL"
        />
      </div>
    </StyledItinerario>
  );
}

const StyledDateContainer = styled.div`
  display: flex;
  flex-direction: column;

  text-align: right;

  .box {
    border-right: 3px solid ${colors.gray};
    padding: 0 1rem 0 0;

    h1 {
      font-weight: 600;
      margin: 1rem 0;
    }
  }

  a {
    text-decoration: none;
    button {
      padding: 0.5rem 1rem;
      background: ${colors.cream};
      margin: 1rem calc(1rem + 3px) 0 0;
      border: 1px solid ${colors.gray};
      color: ${colors.gray};
    }
  }

  .dressCode {
    background: ${colors.gray};
    color: ${colors.white};
    padding: 2rem;
    text-align: center;
  }
`;

type Date = {
  date: string;
  ceremony: string;
  address: string;
  a: string;
  dressCode: string;
};

const Date = (props: Date) => (
  <StyledDateContainer>
    <Container>
      <div className="box">
        <h2>{props.date}</h2>
        <h1>{props.ceremony}</h1>
        <CopyToClipboard text={props.address} />
      </div>

      <a href={props.a} target="_blank">
        <button>UBICACIÓN</button>
      </a>
    </Container>

    <div className="dressCode">
      <h2>{props.dressCode}</h2>
    </div>
  </StyledDateContainer>
);

const CopyToClipboard = ({ text }: { text: string }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTooltipVisible(true);
        setTimeout(() => setTooltipVisible(false), 1500);
      })
      .catch((err) => {
        console.error('Error al copiar el texto: ', err);
      });
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <h3 onClick={handleCopy}>{text}</h3>
      {tooltipVisible && (
        <span
          style={{
            position: 'absolute',
            bottom: '120%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'black',
            color: 'white',
            padding: '5px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            zIndex: '1',
          }}
        >
          ¡Texto copiado!
        </span>
      )}
    </div>
  );
};
