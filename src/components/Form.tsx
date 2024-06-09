import styled from 'styled-components';
import Container from './Container';
import Text from './Text';
import { SubGuest, useSDK } from './Sdk';
import { useCallback, useEffect } from 'react';
import { colors } from '../assets/theme';

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
  font-family: jakarta-regular;

  .cheks-list {
    display: flex;
    flex-wrap: wrap;
    max-width: 500px;
    margin: 10px auto;
    justify-content: center;
  }

  .form-btns {
    display: flex;
    justify-content: center;

    button {
      margin: 10px;
      padding: 10px 20px;
      border-radius: 5px;
      background-color: ${colors.green};
      color: white;
      font-family: jakarta-regular;
      cursor: pointer;
      border: none;
      font-size: 14px;
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

  const onChangeCheckbox = (subGuest: SubGuest, checked: boolean) => {
    subGuest.attributes.Confirmation = checked;

    sdk.updateSubGuest(subGuest);
  };

  if (!sdk.user) {
    return null;
  }

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Container>
        <Text
          text={`!Hola ${sdk.user.attributes.name}!, para poder confirmar tu asistencia, es importante que nos indiques cuantas personas te van a acompañar`}
        />
        <br />
        <Text text="Por favor, indicanos quien de las siguientes personas te van a caompañar" />
        <div className="cheks-list">
          {sdk.user.attributes.sub_guests.data.map((subGuest) => {
            return (
              <SubGuestCheckbox
                onChangeCheckbox={onChangeCheckbox}
                key={subGuest.id}
                subGuest={subGuest}
              />
            );
          })}
        </div>
        <Text text="Recuerda que por seguridad, solo pueden asistir las personas que esten registradas y que esten confirmadas" />
      </Container>

      <div className="form-btns">
        <button type="submit">Confirmar asistencia</button>
        <button type="button">No podre asistir</button>
      </div>
    </StyledForm>
  );
}

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 5px;
  border-radius: 5px;
`;

const StyledSubGuestCheckbox = styled.label`
  font-family: jakarta-regular;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  background-color: ${colors.green};
  color: white;
  font-size: 14px;

  display: flex;
  align-items: center;
`;

const SubGuestCheckbox = ({
  subGuest,
  onChangeCheckbox,
}: {
  subGuest: SubGuest;
  onChangeCheckbox: (subGuest: SubGuest, checked: boolean) => void;
}) => {
  return (
    <StyledSubGuestCheckbox>
      <StyledCheckbox
        checked={subGuest.attributes.Confirmation}
        id={`${subGuest.id}`}
        type="checkbox"
        onChange={(e) => onChangeCheckbox(subGuest, e.target.checked)}
      />
      <label htmlFor={`${subGuest.id}`}>{subGuest.attributes.Name}</label>
    </StyledSubGuestCheckbox>
  );
};
