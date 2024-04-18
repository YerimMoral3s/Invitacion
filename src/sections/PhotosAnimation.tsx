import styled from 'styled-components';
import { colors } from '../assets/theme';
import useScroll from '../Utils/useScroll';
import img1 from '../assets/images/irv-son-1.jpg';
import img2 from '../assets/images/irv-son-2.jpg';
import img3 from '../assets/images/irv-son-3.jpg';
import img4 from '../assets/images/irv-son-4.jpg';
import img5 from '../assets/images/irv-son-5.jpg';
import img6 from '../assets/images/irv-son-6.jpg';
import img7 from '../assets/images/irv-son-7.jpg';
// import images from 8 to 15
import img8 from '../assets/images/irv-son-8.jpg';
import img9 from '../assets/images/irv-son-9.jpg';
import img10 from '../assets/images/irv-son-10.jpg';
import img11 from '../assets/images/irv-son-11.jpg';
import img12 from '../assets/images/irv-son-12.jpg';
import img13 from '../assets/images/irv-son-13.jpg';
import img14 from '../assets/images/irv-son-14.jpg';
import img15 from '../assets/images/irv-son-15.jpg';

import { useEffect, useRef } from 'react';

const imagesArray = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
];

const heigContainer = imagesArray.length * 30;

type styledProps = {
  show: 'false' | 'true';
};

const StyledPhotosAnimation = styled.div<styledProps>`
  position: static;
  top: 0px;
  height: ${heigContainer}vh;
  background-color: ${colors.green};

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
  const imageRef = useRef<HTMLImageElement>(null);

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

    if (scroll > height + 600) {
      // change the image
      imageRef.current.src = img6;
    }

    if (scroll > height + 700) {
      // change the image
      imageRef.current.src = img7;
    }

    if (scroll > height + 800) {
      // change the image
      imageRef.current.src = img8;
    }

    if (scroll > height + 900) {
      // change the image
      imageRef.current.src = img9;
    }

    if (scroll > height + 1000) {
      // change the image
      imageRef.current.src = img10;
    }

    if (scroll > height + 1100) {
      // change the image
      imageRef.current.src = img11;
    }

    if (scroll > height + 1200) {
      // change the image
      imageRef.current.src = img12;
    }

    if (scroll > height + 1300) {
      // change the image
      imageRef.current.src = img13;
    }

    if (scroll > height + 1400) {
      // change the image
      imageRef.current.src = img14;
    }

    if (scroll > height + 1500) {
      // change the image
      imageRef.current.src = img15;
    }
  }, [scroll]);

  return (
    <StyledPhotosAnimation show={scroll > 50 ? 'true' : 'false'}>
      <img ref={imageRef} className="proposal-img" alt="proposal" src={img1} />
    </StyledPhotosAnimation>
  );
}
