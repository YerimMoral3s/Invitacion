import styled from 'styled-components';
import Container from './Container';
import Text from './Text';

import { colors } from '../assets/theme';
import {
  SubGuest,
  useAcceptInvitation,
  useDeclineInvitation,
  useUpdateSubGuest,
  useUser,
} from './Sdk';

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
  }
`;

export default function Form() {
  const { data: user, error, isLoading } = useUser();
  const acceptInvitationMutation = useAcceptInvitation();
  const declineInvitationMutation = useDeclineInvitation();
  const updateSubGuest = useUpdateSubGuest();

  if (!user || error || isLoading) return null;

  const handleAcceptInvitation = () => {
    if (user) {
      acceptInvitationMutation.mutate(user);
    }
  };

  const handleDeclineInvitation = () => {
    if (user) {
      declineInvitationMutation.mutate(user);
    }
  };

  const onChangeCheckbox = async (subGuest: SubGuest, checked: boolean) => {
    console.log('user', ['user']);

    updateSubGuest({ subGuest, checked, user });
  };

  return (
    <StyledForm>
      <Container>
        <Text
          text={`¡Hola ${user.attributes.name}!, para poder confirmar tu asistencia, es importante que nos indiques cuántas personas te van a acompañar`}
        />

        <br />
        <Text text="Por favor, indícanos quién de las siguientes personas te va a acompañar" />
        <div className="cheks-list">
          {user.attributes.sub_guests.data.map((subGuest) => {
            return (
              <SubGuestCheckbox
                onChangeCheckbox={onChangeCheckbox}
                key={subGuest.id}
                subGuest={subGuest}
              />
            );
          })}
        </div>
        <Text text="Recuerda que por seguridad, solo pueden asistir las personas que estén registradas y que estén confirmadas" />
      </Container>

      <div className="form-btns">
        <button type="button" onClick={handleAcceptInvitation}>
          Confirmar asistencia
        </button>
        <button type="button" onClick={handleDeclineInvitation}>
          No podré asistir
        </button>
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
        checked={subGuest.attributes.confirmation}
        id={`${subGuest.id}`}
        onChange={(e) => onChangeCheckbox(subGuest, e.target.checked)}
      />
      <label htmlFor={`${subGuest.id}`}>{subGuest.attributes.Name}</label>
    </StyledSubGuestCheckbox>
  );
};
