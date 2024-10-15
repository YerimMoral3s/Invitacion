import styled from 'styled-components';
import Container from '../Container';
import { colors } from '../theme';
import Title from './hospitalities';
import { CopyToClipboard } from '../copy';
import BARUK from './BARUK.pdf';
import BECQUER from './BECQUER.pdf';

const StyledHospitalities = styled.div`
  background: ${colors.gray};
  color: ${colors.white};

  svg {
    max-width: 100%;
  }

  // * {
  //   border: 1px solid red;
  // }

  .line {
    border-top: 2px solid white;
    margin: 1r em 0;
  }
  h1,
  h2,
  h3 {
    font-weight: normal;
  }

  .btns-hotel {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;

    a {
      flex: 1;
      text-align: center;
      &:nth-child(2) {
        margin: 0 1rem;
      }
    }

    button {
      width: 100%;
      padding: 5px;
      background: ${colors.gray};
      color: ${colors.white};
      border: 1px solid ${colors.white};
    }
  }
`;

type HotelProps = {
  nombre: string;
  direccion: string;
  informacion: string;
  ubicacion: string;
  telefono: string;
};

const BecquerHotel: HotelProps = {
  nombre: 'Becquer Hotel Guadalajara',
  direccion: 'Av. Guadalupe 596, Chapalita, Guadalajara, Jalisco.',
  informacion: BECQUER,
  ubicacion: 'https://maps.app.goo.gl/YA7kWpKdBYpDAGLS6',
  telefono: '3338351338',
};

const BarukHotel: HotelProps = {
  nombre: 'Baruk Hotel de Autor Guadalajara',
  direccion: 'Calz. Lázaro Cárdenas 3447, Chapalita, Guadalajara, Jalisco.',
  informacion: BARUK,
  ubicacion: 'https://maps.app.goo.gl/a7uHCWhB8JCogLL8A',
  telefono: '3331217893',
};

// transporte: {
//   mensaje:
//     'No te preocupes por el transporte, ¡te tenemos una solución! Nos pondremos en contacto contigo.',
// },

export default function Hospitalities() {
  return (
    <StyledHospitalities>
      <Container>
        <Title />
        <div style={{ marginTop: '2rem' }} className="line"></div>
        <Hosp hotel={BecquerHotel} />
        <div className="line"></div>
        <Hosp hotel={BarukHotel} />
        <div
          className="line"
          style={{ marginBottom: '2rem', textAlign: 'center' }}
        ></div>
        <p style={{ textAlign: 'center' }}>
          No te preocupes por el transporte Hotel-Boda-Hotel. ¡Te tenemos una
          solución! Nos pondremos en contacto contigo.
        </p>
      </Container>
    </StyledHospitalities>
  );
}

const StyledHotel = styled.div``;

const Hosp = ({ hotel }: { hotel: HotelProps }) => (
  <StyledHotel>
    <Container>
      <CopyToClipboard
        name={hotel.nombre}
        text={hotel.direccion}
        position="right"
      />
      <div className="btns-hotel">
        <a href={hotel.informacion} target="_blank">
          <button>INFORMACÍON</button>
        </a>
        <a href={hotel.ubicacion} target="_blank">
          <button>UBICACIÓN</button>
        </a>
        <a href={'tel:+' + hotel.telefono} target="_blank">
          <button>LLAMAR</button>
        </a>
      </div>
      <span style={{ fontSize: '10px', marginTop: '2px' }}>
        * Favor de revisar la información antes de hacer tu reservación
      </span>
    </Container>
  </StyledHotel>
);
