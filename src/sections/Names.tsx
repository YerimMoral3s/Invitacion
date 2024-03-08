import styled from 'styled-components';

import { useEffect, useRef } from 'react';
import Text from '../components/Text';
import { colors } from '../assets/theme';

const StyledNames = styled.div`
  display: flex;
  gap: 10px;
  height: 100vh;
  background-color: ${colors.lightGrey};

  .container {
    margin: auto;

    height: 500px;
    width: 100%;
    position: relative;

    // background-color: pink;

    .names-container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;

      .namesSubContainer {
        overflow: hidden;

        .names {
          line-height: 1;
          font-family: jakarta-extra-light;
          color: ${colors.darkGrey};
        }
      }
    }

    .names-container-1 {
      position: absolute;
      background-color: yellow;
      // animation: alignTextFromTop2Center 1.2s ease-in-out forwards;
    }

    .names-container-2 {
      background-color: green;
      position: absolute;
      bottom: 0;
      right: 0;
      // animation: alignTextFromTop2Bottom 1.2s ease-in-out forwards;
    }
  }

  // @keyframes alignTextFromTop2Center {
  //   0% {
  //     top: -20%;
  //   }
  //   100% {
  //     top: 40%;
  //   }
  // }

  // @keyframes alignTextFromTop2Bottom {
  //   0% {
  //     bottom: -20%;
  //   }
  //   100% {
  //     bottom: 41%;
  //   }
  // }
`;

// Ahora puedes usar StyledNames en tu componente React

const Names = () => {
  const namesSubContainer = useRef<HTMLDivElement>(null);
  const namesSubContainer2 = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const half = 250;

  useEffect(() => {
    if (
      namesSubContainer.current &&
      namesSubContainer2.current &&
      textRef.current
    ) {
      const { height } = textRef.current.getBoundingClientRect();
      const containerHeight = height / 1.6;
      namesSubContainer.current.style.height = `${containerHeight}px`;
      namesSubContainer2.current.style.height = `${containerHeight}px`;

      namesSubContainer.current.style.position = 'absolute';
      namesSubContainer2.current.style.position = 'absolute';

      for (let i = 0; i < half - height / 1.85; i++) {
        setTimeout(() => {
          if (namesSubContainer.current && namesSubContainer2.current) {
            namesSubContainer.current.style.top = `${i}px`;
            namesSubContainer2.current.style.bottom = `${i}px`;
          }
        }, i * 4);
      }
    }
  }, []);

  return (
    <StyledNames>
      <div className="container">
        <div
          className="names-container names-container-1"
          style={{ top: '-20%' }}
        >
          <div className="namesSubContainer" ref={namesSubContainer}>
            <Text
              ref={textRef}
              as="h1"
              text="IRVIN Y SONIA"
              className="names fade-in "
            />
          </div>
        </div>
        <div className="names-container names-container-2">
          <div
            className="namesSubContainer"
            ref={namesSubContainer2}
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                height: '100%',
              }}
            >
              <Text
                as="h1"
                text="IRVIN Y SONIA"
                className="names fade-in "
                style={{
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  top: 'calc(-50% - 6.2px)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </StyledNames>
  );
};

export default Names;
