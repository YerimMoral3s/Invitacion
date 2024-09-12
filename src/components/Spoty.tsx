import styled from 'styled-components';
import Container from './Container';
import { colors } from './theme';

const StyledSpoty = styled.div`
  width: 100%;
  background: ${colors.cream};
  color: ${colors.gray};
  h1,
  h2 {
    font-weight: normal;
  }
  h1 {
  }
  .box {
    text-align: right;
    border-right: 3px solid ${colors.gray};
    padding: 0 1rem 0 0;
    margin: 2rem 0;
  }
`;

export default function Spoty() {
  return (
    <StyledSpoty>
      <Container>
        <h1 style={{ letterSpacing: '5px', fontSize: '3rem' }}>MUSICA</h1>
        <div className="box">
          <h2>
            Nos hace muy felices que nos acompañes y queremos que sea un día
            especial para ti, como para nosotros. ¡Regálanos tu canción favorita
            o aquella que estás seguro no puede faltar!
          </h2>
        </div>
        <iframe
          style={{ borderRadius: '12px', width: '100%' }}
          src="https://open.spotify.com/embed/playlist/2UOSv33cfrcXLFybgdrqmF?utm_source=generator&theme=0"
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
