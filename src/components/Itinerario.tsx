import styled from 'styled-components';
import Container from './Container';
import { colors } from './theme';
import { CopyToClipboard } from './copy';

const StyledItinerario = styled.div`
  background: ${colors.cream};
  font-family: 'Montserrat', sans-serif;
  color: ${colors.gray};
  h1,
  h2,
  h3 {
    font-weight: normal;
  }
`;

export default function Itinerario() {
  return (
    <StyledItinerario>
      <Container style={{ paddingBottom: '0' }}>
        <h1 style={{ letterSpacing: '5px', fontSize: '3rem' }}>ITINERARIO</h1>
      </Container>
      <Date
        date="SABADO 01/18:30 HRS"
        ceremony="CEREMONIA CIVIL"
        name="SALON DE EVENTOS AMARANTO"
        address="Av. Gobernador Alfredo del Mazo Mz. 76 Lt. 38, Villa de Guadalupe Xalostoc, Ecatepec de Morelos."
        a="https://maps.app.goo.gl/mtk1zwA3hEZNhh399"
        dressCode="DRESS CODE: COCTEL"
      />
      <div>
        <Date
          date="SABADO 15/16:30 HRS"
          ceremony="CEREMONIA RELIGIOSA"
          name="FINCA BY ALOFA"
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
      font-weight: 500;
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
      letter-spacing: 2px;
      color: ${colors.gray};
    }
  }

  .dressCode {
    background: ${colors.gray};

    padding: 2rem;
    text-align: center;
    h2 {
      color: ${colors.white};
    }
  }
`;

type Date = {
  date: string;
  ceremony: string;
  address: string;
  name: string;
  a: string;
  dressCode: string;
};

const Date = (props: Date) => (
  <StyledDateContainer>
    <Container>
      <div className="box">
        <h2>{props.date}</h2>
        <h1>{props.ceremony}</h1>
        <CopyToClipboard text={props.address} name={props.name} />
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
