import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

  .c-1 {
    background: ${colors.cream};
  }

  .c-2 {
    background: ${colors.cream};
  }

  .c-3 {
    background: ${colors.cream};
  }

  .c-4 {
    background: ${colors.cream};
  }

  .c-5 {
    background: ${colors.cream};
  }

  .card {
    min-height: 100px;
    background-size: cover;
    background-position: center;
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
};

export default function Gallery() {
  const [cards, setCards] = useState<card[]>([]);
  const [fullImage, setFullImage] = useState<string | null>(null);

  useEffect(() => {
    const cardData: card[] = [];

    for (let n = 0; n < images.length; n++) {
      const span =
        weightedRand({ 1: 0.2, 2: 0.2, 3: 0.2, 4: 0.2, 5: 0.2 }) || '1';
      const url = images[n];
      const className = `c-${weightedRand({ 1: 0.2, 2: 0.2, 3: 0.2, 4: 0.2, 5: 0.2 })}`;
      cardData.push({ span, url, className });
    }

    setCards(cardData);
  }, []);

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
                onClick={() => setFullImage(card.url)}
                key={index}
                span={card.span}
                url={card.url}
                className={card.className}
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
  onClick: () => void;
};

const Card = ({ span, url, className, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={`card span-${span} ${className}`}
      style={{ backgroundImage: `url(${url})` }}
    ></div>
  );
};

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
