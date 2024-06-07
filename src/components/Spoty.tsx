import styled from 'styled-components';
import Container from './Container';

const StyledSpoty = styled.div`
  width: 100%;
  height: calc(500px + 2rem);
`;

export default function Spoty() {
  return (
    <StyledSpoty>
      <Container>
        <iframe
          style={{ borderRadius: '12px', width: '100%' }}
          src="https://open.spotify.com/embed/playlist/3VENZLfQoCZbS49i9JSS6y?utm_source=generator&theme=0"
          width="100%"
          height="500px"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </Container>
    </StyledSpoty>
  );
}
