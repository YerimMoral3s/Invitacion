import styled from 'styled-components';
import { colors } from '../assets/theme';
import img1 from '../assets/images/irv-son-1.jpg';
import img2 from '../assets/images/irv-son-2.jpg';
import img3 from '../assets/images/irv-son-3.jpg';
import img4 from '../assets/images/irv-son-4.jpg';
import img5 from '../assets/images/irv-son-5.jpg';
import img6 from '../assets/images/irv-son-6.jpg';

import { useEffect, useRef, useState } from 'react';
import Logo from '../components/Logo';

const imagesArray = [img1, img2, img3, img4, img5, img6];

const StyledPhotosAnimation = styled.section`
  position: relative;
  z-index: 20;
  width: 100vw;
  height: 200vh;

  .static-container {
    width: 100vw;
    height: 100vh;

    position: sticky;
    top: 0;

    .logo-container {
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;
      z-index: 1;
    }

    .proposal-img-container {
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      top: 0;

      z-index: 0;

      filter: grayscale(100%);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export default function PhotosAnimation() {
  const sectionRef = useRef<number>(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const scroll = () => {
    if (!imageRef.current || !imagesArray) return;
    const scrollPosition = window.scrollY;
    const section = Math.floor(
      scrollPosition / (viewportHeight / imagesArray.length),
    );

    if (section !== sectionRef.current && section < imagesArray.length) {
      sectionRef.current = section;
      imageRef.current.src = imagesArray[sectionRef.current];
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scroll);
    document.addEventListener('resize', () =>
      setViewportHeight(window.innerHeight),
    );

    return () => {
      document.removeEventListener('scroll', scroll);
      document.removeEventListener('resize', () =>
        setViewportHeight(window.innerHeight),
      );
    };
  }, []);

  return (
    <StyledPhotosAnimation>
      <div className="static-container">
        <div className="logo-container">
          <Logo
            className="logo-is fade-in-slow"
            width={600}
            height={600}
            fill={colors.white}
            stroke={colors.white}
          />
        </div>

        <div className="proposal-img-container">
          <img
            ref={imageRef}
            className="proposal-img fade-in"
            alt={`imagen-${imagesArray[sectionRef.current]}`}
            src={imagesArray[sectionRef.current]}
          />
        </div>
      </div>
    </StyledPhotosAnimation>
  );
}
