import styled from 'styled-components';
import { colors } from './theme';

const Styled = styled.div`
  font-family: 'Noto Serif', sans-serif;
  text-align: center;
  padding: 10px;
  font-size: 2rem;
  font-style: italic;
  background: ${colors.cream};
  color: ${colors.gray};

  .border {
    border: 2px solid ${colors.gray};
    padding: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export default function NosCasamos() {
  return (
    <Styled>
      <div className="border">¡Nos Casamos!</div>
    </Styled>
  );
}
