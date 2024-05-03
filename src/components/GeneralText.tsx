import styled from 'styled-components';
import Container from './Container';
import Text from './Text';

const StyledGeneralText = styled.div`
  .container-ImageCallAction {
    text-align: center;

    p {
      font-family: rosarivo-italic;
      font-size: 1.5rem;
      margin: 1rem 0;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }
`;

export default function GeneralText(props: { texts: string[] }) {
  return (
    <StyledGeneralText>
      <Container className="container-ImageCallAction">
        {props.texts.map((text, index) => (
          <Text key={index} text={text} as="p" />
        ))}
      </Container>
    </StyledGeneralText>
  );
}
