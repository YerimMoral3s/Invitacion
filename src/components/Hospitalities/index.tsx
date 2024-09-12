import styled from 'styled-components';
import Container from '../Container';
import { colors } from '../theme';
import Title from './hospitalities';
import { CopyToClipboard } from '../CopyToClipboard';

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
};

const BecquerHotel: HotelProps = {
  nombre: 'Becquer Hotel Guadalajara',
  direccion: 'Av. Guadalupe 596, Chapalita, Guadalajara, Jalisco.',
  informacion: 'Información',
  ubicacion: 'Ubicación',
};

const BarukHotel: HotelProps = {
  nombre: 'Baruk Hotel de Autor Guadalajara',
  direccion: 'Calz. Lázaro Cárdenas 3447, Chapalita, Guadalajara, Jalisco.',
  informacion: 'Información',
  ubicacion: 'Ubicación',
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
        <div className="line"></div>
        <Hosp hotel={BecquerHotel} />
        <div className="line"></div>
        <Hosp hotel={BarukHotel} />
        <div
          className="line"
          style={{ marginBottom: '2rem', textAlign: 'center' }}
        ></div>
        <p style={{ textAlign: 'center' }}>
          No te preocupes por el transporte, ¡te tenemos una solución! Nos
          pondremos en contacto contigo.
        </p>
      </Container>
    </StyledHospitalities>
  );
}

const StyledHotel = styled.div``;

const Hosp = ({ hotel }: { hotel: HotelProps }) => (
  <StyledHotel>
    <Container>
      <CopyToClipboard name={hotel.nombre} text={hotel.direccion} />
      <div className="btns-hotel">
        <a href={hotel.ubicacion} target="_blank">
          <button>INFORMACÍON</button>
        </a>
        <a href={hotel.ubicacion} target="_blank">
          <button>UBICACIÓN</button>
        </a>
        <a href={hotel.ubicacion} target="_blank">
          <button>LLAMAR</button>
        </a>
      </div>
    </Container>
  </StyledHotel>
);
