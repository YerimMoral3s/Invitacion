import styled from 'styled-components';
import { colors } from '../assets/theme';
// images for web (lowRes)
import img1_web from '../assets/images/images-couple/web/irv-son-1-web.jpg';
// import img1_web from '../assets/images/images-couple/web/i|rv-son-1-web.jpg';
import img2_web from '../assets/images/images-couple/web/irv-son-2-web.jpg';
import img3_web from '../assets/images/images-couple/web/irv-son-3-web.jpg';
import img4_web from '../assets/images/images-couple/web/irv-son-4-web.jpg';
import img5_web from '../assets/images/images-couple/web/irv-son-5-web.jpg';
import img6_web from '../assets/images/images-couple/web/irv-son-6-web.jpg';
// images for mobile (highRes)
import img1_mobile from '../assets/images/images-couple/mobile/irv-son-1-mobile.jpg';
import img2_mobile from '../assets/images/images-couple/mobile/irv-son-2-mobile.jpg';
import img3_mobile from '../assets/images/images-couple/mobile/irv-son-3-mobile.jpg';
import img4_mobile from '../assets/images/images-couple/mobile/irv-son-4-mobile.jpg';
import img5_mobile from '../assets/images/images-couple/mobile/irv-son-5-mobile.jpg';
import img6_mobile from '../assets/images/images-couple/mobile/irv-son-6-mobile.jpg';

import { useEffect, useRef, useState } from 'react';
import Logo from '../components/Logo';

const imagesArray = [
  { lowRes: img1_web, highRes: img1_mobile },
  { lowRes: img2_web, highRes: img2_mobile },
  { lowRes: img3_web, highRes: img3_mobile },
  { lowRes: img4_web, highRes: img4_mobile },
  { lowRes: img5_web, highRes: img5_mobile },
  { lowRes: img6_web, highRes: img6_mobile },
];

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
    if (!imageRef.current) return;
    const scrollPosition = window.scrollY;
    const section = Math.floor(
      scrollPosition / (viewportHeight / imagesArray.length),
    );

    if (section !== sectionRef.current && section < imagesArray.length) {
      sectionRef.current = section;
      const image = imagesArray[sectionRef.current];
      imageRef.current.src = image.lowRes;
      const highResImage = new Image();
      highResImage.src = image.highRes;
      highResImage.onload = () => {
        console.log('loaded');
        if (imageRef.current) {
          imageRef.current.src = image.highRes;
        }
      };
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
            alt={`imagen-${sectionRef.current}`}
            src={imagesArray[sectionRef.current].lowRes}
          />
        </div>
      </div>
    </StyledPhotosAnimation>
  );
}
