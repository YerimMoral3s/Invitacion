import styled from 'styled-components';
import img from './banner.png';

const StyledBanner = styled.div`
  max-width: 100%;
  height: 12rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
  }
`;

export default function Banner() {
  return (
    <StyledBanner>
      <img src={img} alt="" />
    </StyledBanner>
  );
}
