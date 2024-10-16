import styled from 'styled-components';
import { colors } from '../theme';
import { SubGuest } from '../sdk/types';

// import { useUpdateGuest } from '../sdk';

const StyledName = styled.button`
  background: ${colors.gray};
  color: ${colors.white};
  border: 1px solid white;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 10px;
  &.confirmed {
    background: ${colors.white};
    color: ${colors.gray};
  }
  &:disabled {
    opacity: 0.4;
  }
`;

export default function Name(props: {
  subGuest: SubGuest;
  user: number;
  onClick: (subGuest: SubGuest) => void;
  disabled: boolean;
}) {
  return (
    <StyledName
      className={props.subGuest.attributes.confirmation ? 'confirmed' : ''}
      onClick={() => props.onClick(props.subGuest)}
      disabled={props.disabled}
    >
      {getName(props.subGuest.attributes.name)}
    </StyledName>
  );
}

function getName(fullName: string): string {
  // Dividir el string en palabras usando el espacio como delimitador
  const words = fullName.split(' ');

  // Convertir la primera letra de cada palabra en mayúscula y el resto en minúsculas
  const formattedName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return formattedName;
}
