import styled from 'styled-components';
import Container from './Container';
import { colors } from './theme';

const StyledGiftTable = styled.div`
  background: ${colors.cream};
  text-align: center;
  h1 {
    // font-weight: 500;
    color: ${colors.gray};
  }
  a {
    text-decoration: none;
    button {
      padding: 0.5rem 1rem;
      background: ${colors.cream};
      border: 1px solid ${colors.gray};
      color: ${colors.gray};
      letter-spacing: 2px;
    }
  }
`;

export default function GiftTable() {
  return (
    <StyledGiftTable>
      <Container>
        <h1>MESA DE REGALOS</h1>
        <div style={{ margin: '1rem 0' }}>
          <p>GRACIAS POR FORMAR PARTE DE </p>
          <p>NUESTRO INICIO COMO FAMILIA</p>
        </div>

        <a
          href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51499036"
          target="_blank"
        >
          <button>LIVERPOOL</button>
        </a>
      </Container>
    </StyledGiftTable>
  );
}
