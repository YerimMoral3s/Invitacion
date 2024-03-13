import styled from 'styled-components';
import { colors } from '../assets/theme';
import useScroll from '../Utils/useScroll';
import img1 from '../assets/images/irv-son-1.jpg';
import img2 from '../assets/images/irv-son-2.jpg';
import img3 from '../assets/images/irv-son-3.jpg';
import img4 from '../assets/images/irv-son-4.jpg';
import img5 from '../assets/images/irv-son-5.jpg';

type styledProps = {
  show: 'false' | 'true';
};

const StyledPhotosAnimation = styled.div<styledProps>`
  position: fixed;
  top: 0;

  width: 100%;

  background-color: ${colors.champania};

  .proposal-container {
    position: relative;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .proposal-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);

    opacity: ${(props) => (props.show === 'true' ? 1 : 0)};
    animation: ${(props) =>
      props.show === 'true'
        ? 'fadeIn 1s ease-in-out;'
        : 'fadeOut 0.3s ease-in-out;'};
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export default function PhotosAnimation() {
  const { scroll } = useScroll();
  console.log(scroll);

  return (
    <StyledPhotosAnimation show={scroll > 50 ? 'true' : 'false'}>
      <div className="proposal-container">
        <img className="proposal-img" src={img1} alt="proposal" />
      </div>
    </StyledPhotosAnimation>
  );
}
