import styled from 'styled-components';
import { colors } from '../assets/theme';
import useScroll from '../Utils/useScroll';
import img1 from '../assets/images/irv-son-1.jpg';
import img2 from '../assets/images/irv-son-2.jpg';
import img3 from '../assets/images/irv-son-3.jpg';
import img4 from '../assets/images/irv-son-4.jpg';
import img5 from '../assets/images/irv-son-5.jpg';
import { useEffect, useRef } from 'react';

type styledProps = {
  show: 'false' | 'true';
};

const StyledPhotosAnimation = styled.div<styledProps>`
  position: static;
  top: 0px;
  height: 280vh;
  background-color: ${colors.champania};

  .proposal-img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: sticky;
    top: 0px;
    filter: grayscale(100%);
    opacity: ${(props) => (props.show === 'true' ? 1 : 0)};
    animation: ${(props) =>
      props.show === 'true'
        ? 'fadeIn 1s ease-in-out;'
        : 'fadeOut 0.3s ease-in-out;'};

    opacity: ${(props) => (props.show === 'true' ? 1 : 0)};
  }
`;

export default function PhotosAnimation() {
  const { scroll } = useScroll();
  const imageRef = useRef(null);

  useEffect(() => {
    const curtain = document.querySelector('.curtain');

    if (!curtain) return;
    if (!imageRef.current) return;

    // get height of the curtain
    const { height } = curtain.getBoundingClientRect();

    if (scroll < height + 100) {
      // change the image
      imageRef.current.src = img1;
    }

    if (scroll > height + 200) {
      // change the image
      imageRef.current.src = img2;
    }

    if (scroll > height + 300) {
      // change the image
      imageRef.current.src = img3;
    }

    if (scroll > height + 400) {
      // change the image
      imageRef.current.src = img4;
    }

    if (scroll > height + 500) {
      // change the image
      imageRef.current.src = img5;
    }
  }, [scroll]);

  return (
    <>
      <StyledPhotosAnimation show={scroll > 50 ? 'true' : 'false'}>
        <img ref={imageRef} className="proposal-img" alt="proposal" />
      </StyledPhotosAnimation>
    </>
  );
}
