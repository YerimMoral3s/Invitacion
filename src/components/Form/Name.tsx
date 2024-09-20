import styled from 'styled-components';
import { colors } from '../theme';

const StyledName = styled.button`
  background: ${colors.gray};
  color: ${colors.white};
  border: 1px solid white;
  padding: 0.5rem;
  margin: 0.5rem;
`;

export default function Name(props: { name: string }) {
  return <StyledName>{props.name}</StyledName>;
}
