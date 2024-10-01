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

  &.confirmed {
    background: ${colors.white};
    color: ${colors.gray};
  }
`;

export default function Name(props: {
  subGuest: SubGuest;
  user: number;
  onClick: (subGuest: SubGuest) => void;
}) {
  return (
    <StyledName
      className={props.subGuest.attributes.confirmation ? 'confirmed' : ''}
      onClick={() => props.onClick(props.subGuest)}
    >
      {props.subGuest.attributes.name}
    </StyledName>
  );
}
