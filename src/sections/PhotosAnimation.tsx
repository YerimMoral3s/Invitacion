import styled from 'styled-components';
import { colors } from '../components/theme';
// images for web (lowRes)
import img1_web from '../assets/images/images-couple/web/irv-son-1-web.jpg';
import img2_web from '../assets/images/images-couple/web/irv-son-2-web.jpg';
import img3_web from '../assets/images/images-couple/web/irv-son-3-web.jpg';
import img4_web from '../assets/images/images-couple/web/irv-son-4-web.jpg';
import img5_web from '../assets/images/images-couple/web/irv-son-5-web.jpg';
import img6_web from '../assets/images/images-couple/web/irv-son-6-web.jpg';
// images for mobile (highRes)
import img2_mobile from '../assets/images/images-couple/mobile/irv-son-2-mobile.jpg';
import img3_mobile from '../assets/images/images-couple/mobile/irv-son-3-mobile.jpg';
import img4_mobile from '../assets/images/images-couple/mobile/irv-son-4-mobile.jpg';
import img5_mobile from '../assets/images/images-couple/mobile/irv-son-5-mobile.jpg';
import img6_mobile from '../assets/images/images-couple/mobile/irv-son-6-mobile.jpg';

import { useEffect, useRef, useState } from 'react';
import Logo from '../components/Logo';
import { loaderStore } from '../components/Loader';

const imagesArray = [
  { lowRes: img1_web, highRes: img1_web },
  { lowRes: img2_mobile, highRes: img2_web },
  { lowRes: img3_mobile, highRes: img3_web },
  { lowRes: img4_mobile, highRes: img4_web },
  { lowRes: img5_mobile, highRes: img5_web },
  { lowRes: img6_mobile, highRes: img6_web },
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
  const loaderstore = loaderStore();
  const isFirstImageLoaded = useRef(false);

  const scroll = () => {
    if (!imageRef.current) return;
    const scrollPosition = window.scrollY;
    const section = Math.floor(
      scrollPosition / (viewportHeight / imagesArray.length),
    );

    if (
      section !== sectionRef.current &&
      section >= 0 &&
      section < imagesArray.length
    ) {
      sectionRef.current = section;
      const image = imagesArray[sectionRef.current];
      imageRef.current.src = image.lowRes;

      const highResImage = new Image();
      highResImage.src = image.highRes;

      highResImage.onload = () => {
        if (imageRef.current) {
          imageRef.current.src = image.highRes;
        }
      };
    }
  };

  useEffect(() => {
    loaderstore.addPromise(
      new Promise((resolve) => {
        if (isFirstImageLoaded.current) {
          resolve(true);
        }
      }),

      'PhotosAnimation-scroll',
    );
  }, [isFirstImageLoaded.current]);

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

    // eslint-disable-next-line
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
          />
        </div>

        <div className="proposal-img-container">
          <img
            ref={imageRef}
            className="proposal-img fade-in"
            alt={`imagen-${sectionRef.current}`}
            src={imagesArray[sectionRef.current].lowRes}
            onLoad={() => {
              isFirstImageLoaded.current = true;
            }}
          />
        </div>
      </div>
    </StyledPhotosAnimation>
  );
}
