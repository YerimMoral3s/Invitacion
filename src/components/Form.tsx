import styled from 'styled-components';
import Container from './Container';
import Text from './Text';
import { colors } from '../assets/theme';
import { useSDK } from './Sdk';
import { useCallback, useEffect } from 'react';

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

type UrlParams = {
  [key: string]: string;
};

const getUrlParams = <T extends UrlParams>(): T => {
  const urlParams = new URLSearchParams(window.location.search);
  const result = {} as T;

  urlParams.forEach((value, key) => {
    result[key as keyof T] = value as T[keyof T];
  });

  return result;
};

export default function Form() {
  const sdk = useSDK();
  const getUser = useCallback(async () => {
    const params = getUrlParams<{ id?: string }>();

    if (!params.id) {
      return;
    }

    await sdk.getUser(params.id);
  }, [sdk]);

  useEffect(() => {
    getUser();
  }, []);

  if (!sdk.user) {
    return null;
  }

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        console.log('jalo');
      }}
    >
      <Container>
        {/* TODO: NAME */}
        <Text
          text={`!Hola ${sdk.user.attributes.name}!, para poder confirmar tu asistencia, es importante que nos indiques cuantas personas te van a acompañar`}
        />
        <br />
      </Container>
    </StyledForm>
  );
}
