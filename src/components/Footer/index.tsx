import styled from 'styled-components';
import { colors } from '../theme';
import Container from '../Container';
import Flowers from './Flowers';

const StyledFooter = styled.div`
  background: ${colors.cream};
  display: flex;
  flex-direction: column;
  align-items: center;

  .border {
    border: 2px solid ${colors.gray};
    padding: 1rem;

    font-family: 'Noto Serif', sans-serif;
    text-align: center;

    font-size: 1rem;
    font-style: italic;
    background: ${colors.cream};
    color: ${colors.gray};
    margin: 0 0 10px 0;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Container>
        <div className="border">
          <h1>Este día tan importante no sería lo mismo sin ti.</h1>
          <br />
          <h1>¡No faltes!</h1>
        </div>
        <Flowers />
      </Container>
    </StyledFooter>
  );
}
