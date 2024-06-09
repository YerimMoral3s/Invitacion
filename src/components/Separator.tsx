import styled from 'styled-components';
import Container from './Container';
import { colors } from '../assets/theme';
import icon from '../assets/images/flower3.png';
import Text from './Text';
import { useSdk } from '../App';

const StyledSeparator = styled.div`
  width: 100%;
  background-color: ${colors.green};
  margin: 1rem 0;
  margin-bottom: 0;

  .dress-code-container {
    background-color: ${colors.green};
    color: ${colors.black};
    text-align: center;
    font-family: rosarivo-regular;

    a {
      color: ${colors.gold};
      text-decoration: none;
    }

    .text {
      font-family: rosarivo-italic;
      margin: 1rem 0;

      text-transform: uppercase;
    }

    h1 {
      font-size: 3rem;
    }

    h2,
    a {
      font-size: 1.2rem;
    }

    @media (min-width: 768px) {
      h1 {
        font-size: 5rem;
      }

      h2,
      a {
        font-size: 2rem;
      }
    }
  }
`;

type SeparatorProps = {
  title?: string;
  message?: string;
  href?: string;
};

const Separator = (props: SeparatorProps) => {
  return (
    <>
      <StyledSeparator>
        <Container className="dress-code-container">
          {props.title && <Text className="text" as="h2" text={props.title} />}
          {props.message && (
            <Text className="text" as="h1" text={props.message} />
          )}
          {props.href && (
            <a
              className="text"
              href={props.href}
              target="_blank"
              rel="noreferrer"
            >
              Ver Detalles
            </a>
          )}
        </Container>
      </StyledSeparator>
      <img
        src={icon}
        alt="Flower"
        style={{
          width: '100%',
          maxWidth: '300px',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </>
  );
};

export default Separator;
