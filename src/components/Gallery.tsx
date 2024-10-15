import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Container from './Container';

import irvinYSon1 from '../assets/irvYson/1.jpeg';
import irvinYSon3 from '../assets/irvYson/3.jpeg';
import irvinYSon4 from '../assets/irvYson/4.jpeg';
import irvinYSon5 from '../assets/irvYson/6.jpeg';
import irvinYSon7 from '../assets/irvYson/7.jpeg';
import irvinYSon8 from '../assets/irvYson/8.jpeg';
import irvinYSon9 from '../assets/irvYson/9.jpeg';
import irvinYSon10 from '../assets/irvYson/10.jpeg';
import irvinYSon17 from '../assets/irvYson/17.jpeg';
import irvinYSon18 from '../assets/irvYson/18.jpeg';
import { colors } from './theme';

// Define keyframes for fading in the images with slight movement
const fadeInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-70px); /* Slight movement from left */
  }
  to {
    opacity: 1;
    transform: translateX(0); /* Return to original position */
  }
`;

const fadeInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(70px); /* Slight movement from right */
  }
  to {
    opacity: 1;
    transform: translateX(0); /* Return to original position */
  }
`;

// Styled component for the gallery
const StyledGallery = styled.div`
  width: 100%;
  background: ${colors.cream};

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 5px;
    grid-auto-rows: minmax(80px, auto);
    grid-auto-flow: dense;
    align-items: normal;
  }

  .card {
    min-height: 100px;
    background-size: cover;
    background-position: center;
    filter: grayscale(100%);
    opacity: 0; /* Hide initially */
    transition: opacity 0.5s ease-out;

    &.visible {
      &.left {
        opacity: 1;
        animation: ${fadeInFromLeft} 0.8s ease-out forwards;
      }
      &.right {
        opacity: 1;
        animation: ${fadeInFromRight} 0.8s ease-out forwards;
      }
    }
  }

  .span-2 {
    grid-column-end: span 2;
    grid-row-end: span 2;
    min-height: 200px;
  }

  .span-4 {
    grid-column-end: span 4;
    grid-row-end: span 4;
    min-height: 200px;
  }
`;

// Images array
const images = [
  irvinYSon1,
  irvinYSon3,
  irvinYSon4,
  irvinYSon5,
  irvinYSon7,
  irvinYSon8,
  irvinYSon9,
  irvinYSon10,
  irvinYSon17,
  irvinYSon18,
];

type card = {
  span: string;
  url: string;
  className: string;
  animationDirection: 'left' | 'right';
};

export default function Gallery() {
  const [cards, setCards] = useState<card[]>([]);
  const [fullImage, setFullImage] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]); // Array to hold references to each card

  useEffect(() => {
    const cardData: card[] = [];

    for (let n = 0; n < images.length; n++) {
      const span =
        weightedRand({ 1: 0.2, 2: 0.2, 3: 0.2, 4: 0.2, 5: 0.2 }) || '1';
      const url = images[n];
      const className = `c-${weightedRand({ 1: 0.2, 2: 0.2, 3: 0.2, 4: 0.2, 5: 0.2 })}`;
      const animationDirection = Math.random() > 0.5 ? 'left' : 'right'; // Randomly choose animation direction
      cardData.push({ span, url, className, animationDirection });
    }

    setCards(cardData);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.75,
      },
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [cards]);

  useEffect(() => {
    if (fullImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [fullImage]);

  const handleClose = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e?.target as HTMLElement;
    if (target?.id !== 'img') {
      setFullImage(null);
    }
  };

  return (
    <>
      {fullImage && <FullImage img={fullImage} onClose={handleClose} />}
      <StyledGallery>
        <Container>
          <div className="grid">
            {cards.map((card, index) => (
              <Card
                ref={(el) => (cardRefs.current[index] = el)} // Assign ref to each card
                onClick={() => setFullImage(card.url)}
                key={index}
                span={card.span}
                url={card.url}
                className={card.className}
                animationDirection={card.animationDirection}
              />
            ))}
          </div>
        </Container>
      </StyledGallery>
    </>
  );
}

const weightedRand = (spec: { [key: string]: number }) => {
  let i,
    sum = 0;

  const r = Math.random();

  for (i in spec) {
    sum += spec[i];

    if (r <= sum) return i;
  }
};

type CardProps = {
  span: string;
  url: string;
  className: string;
  animationDirection: 'left' | 'right';
  onClick: () => void;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ span, url, className, animationDirection, onClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`card span-${span} ${className} ${animationDirection}`}
        style={{ backgroundImage: `url(${url})` }}
      ></div>
    );
  },
);

const StyledFullImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  img {
    max-width: 80%;
    max-height: 80%;
    border: 5px solid white;
    border-radius: 10px;
    filter: grayscale(100%);
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    button {
      background: none;
      border: 1px solid white;
      padding: 5px 10px;
      border-radius: 50%;
      font-size: 1rem;
      color: white;
      cursor: pointer;
      height: 40px;
      width: 40px;
    }
  }
`;

const FullImage = (props: {
  img: string;
  onClose: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <StyledFullImage onClick={(e) => props.onClose(e)} id="close">
      <div className="close">
        <button onClick={() => props.onClose()}>X</button>
      </div>
      <img src={props.img} alt="Full Image" id="img" />
    </StyledFullImage>
  );
};
