import styled from 'styled-components';
import Container from './Container';
import Text from './Text';
import { colors } from '../assets/theme';

const forms = [
  // {
  //   name: 'Name',
  //   type: 'text',
  //   placeholder: 'Nombre',
  //   required: true,
  // },
  // {
  //   name: 'Email',
  //   type: 'email',
  //   placeholder: 'Correo',
  //   required: true,
  // },
  // {
  //   name: 'Phone',
  //   type: 'tel',
  //   placeholder: 'Teléfono',
  //   required: true,
  // },
  {
    label: 'Total de acompañantes',
    id: 'people',
    name: 'People',
    type: 'border-radius',
    max: 5,
    required: true,
  },
];

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
  font-family: jakarta-regular;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .form-item {
      margin: 1rem 0;

      width: 100%;

      max-width: 500px;

      input {
        width: 100%;
        max-width: 300px;
        flex: 1;
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px dotted #000;
        outline: none;
        margin: 0.5rem;
      }

      label {
        font-size: 1rem;
        font-weight: 600;
      }
    }
    .butons {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        margin: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: none;

        font-size: 1rem;
        cursor: pointer;
        outline: none;

        background-color: ${colors.green};
        color: ${colors.white};
      }
    }
  }
`;

export default function Form() {
  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        console.log('jalo');
      }}
    >
      <Container>
        {/* TODO: NAME */}
        <Text text="!Hola XXXXX!, para poder confirmar tu asistencia, es importante que nos indiques cuantas personas te van a acompañar" />
        <br />
        <Text text="Recuerda que puedes llevar hasta X numero de personas" />
        <div className="form">
          {forms.map((form) => (
            <div key={form.id} className={`form-item form${form.id}`}>
              <label htmlFor={form.id}>{form.label}</label>
              <input
                id={form.id}
                name={form.name}
                type={form.type}
                required={form.required}
              />
            </div>
          ))}
          <div className="butons">
            <button type="submit">Condirmar</button>
            <button>Cancelar</button>
          </div>
        </div>
      </Container>
    </StyledForm>
  );
}
