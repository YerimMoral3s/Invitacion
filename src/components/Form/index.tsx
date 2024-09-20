import styled from 'styled-components';
import Container from '../Container';
import { colors } from '../theme';
import Name from './Name';

const StyledForm = styled.div`
  background: ${colors.gray};
  color: ${colors.white};
  text-align: center;

  h1 {
    letter-spacing: 5px;
  }

  p {
    margin: 2rem 0;
  }

  .names {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .confirm-container {
    margin: 2rem 0 0 0;
  }

  .copy {
    background: ${colors.cream};
    color: ${colors.gray};
    margin: 2rem 0 0 0;
    padding: 1rem;
    p {
      border: 2px solid ${colors.gray};
      padding: 1rem;
      margin: 0;
    }
  }

  .item-btns {
    display: flex;
    justify-content: space-evenly;
    max-width: 500px;
    margin: auto;
    flex-wrap: wrap;

    button {
      background: ${colors.cream};
      color: ${colors.gray};
      letter-spacing: 5px;
      padding: 0.8rem;
      margin: 0.8rem;
      border: 0;
      border-radius: 10px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.8em;
    }
  }
`;

const names: string[] = [
  'dsua',
  'djasdsadsadassad',
  'dadasdasdasdaskjh',
  'dadasdasdasdaskjh',
  'dadasdasdasdaskjh',
  'dadasdasdasdaskjh',
];

const messages = {
  both: '¡Nos alegra saber que podrás acompañarnos en nuestra ceremonia civil y religiosa! Gracias por confirmar tu asistencia, será un placer compartir este día tan especial contigo.',
  civil:
    'Gracias por confirmar tu asistencia a nuestra ceremonia civil. Lamentamos que no puedas acompañarnos en la ceremonia religiosa, pero estamos felices de poder compartir contigo en este momento tan significativo.',
  religiosa:
    'Nos alegra saber que podrás estar con nosotros en la ceremonia religiosa. Entendemos que no puedas asistir a la ceremonia civil, y agradecemos que nos lo hayas confirmado. Tu presencia en este momento sagrado es muy importante para nosotros.',
  none: 'Lamentamos que no puedas acompañarnos en este día especial. Apreciamos que nos hayas informado, y aunque no estés presente físicamente, estarás en nuestros pensamientos. Gracias por tu consideración.',
};

export default function Form() {
  return (
    <StyledForm>
      <Container>
        <h1>CONFIRMACIÓN</h1>

        <p>
          ERES MUY IMPORTANTE PARA NOSOTROS, ESPERAMOS CONTAR CON TU COMPAÑÍA EN
          ESTE DÍA TAN ESPECIAL
        </p>
        <p>
          ¡Hola Yerim!, para poder confirmar tu asistencia es importante que nos
          indiques quienes de las siguientes personas registradas, asistirán.
        </p>
        <p>
          Recuerda que por seguridad, solo podrán asistir las personas que estén
          registradas y confirmadas.
        </p>

        <div className="names">
          {names.map((n) => {
            return <Name name={n} />;
          })}
        </div>

        <div className="confirm-container">
          <div className="confirm-item" style={{ marginBottom: '1rem' }}>
            <h3>¿Asistirás a la ceremonia religiosa?</h3>
            <div className="item-btns">
              <button>
                CONFIRMAR <br />
                ASISTENCIA
              </button>
              <button>
                NO PODRÉ <br />
                ASISTIR
              </button>
            </div>
          </div>
          <div className="confirm-item">
            <h3>¿Asistirás a la ceremonia civil?</h3>
            <div className="item-btns">
              <button>
                CONFIRMAR <br />
                ASISTENCIA
              </button>
              <button>
                NO PODRÉ <br />
                ASISTIR
              </button>
            </div>
          </div>
        </div>
        <div className="copy">
          <p>
            Nos gustaría contar con tu presencia en nuestra ceremonia religiosa.
            Por favor, confirma tu asistencia antes del 15 de diciembre 2024. Si
            no tenemos noticias tuyas, asumiremos que no podrás asistir.
            <br />
            <br />
            {messages.both}
          </p>
        </div>
      </Container>
    </StyledForm>
  );
}
