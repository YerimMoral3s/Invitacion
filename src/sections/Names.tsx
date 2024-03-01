import styled from 'styled-components';

import { useEffect, useRef } from 'react';
import Text from '../components/Text';

const StyledNames = styled.div`
  display: flex;
  gap: 10px;
  height: 100vh;
  background-color: green;

  .container {
    margin: auto;
    background-color: yellow;
    height: 500px;
    width: 100%;
    position: relative;

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
        }
      }
    }

    .names-container-1 {
      position: absolute;
      top: 0;
      left: 0;
      animation: alignTextFromTop2Center 1s ease-in-out forwards;
    }

    .names-container-2 {
      position: absolute;
      bottom: 0;
      right: 0;
      animation: alignTextFromTop2Bottom 1s ease-in-out forwards;
    }
  }

  @keyframes alignTextFromTop2Center {
    0% {
      top: -10%;
    }
    100% {
      top: 46%;
    }
  }

  @keyframes alignTextFromTop2Bottom {
    0% {
      bottom: -10%;
    }
    100% {
      bottom: 46%;
    }
  }
`;

// Ahora puedes usar StyledNames en tu componente React

const Names = () => {
  const namesSubContainer = useRef<HTMLDivElement>(null);
  const namesSubContainer2 = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
    }
  }, []);

  return (
    <StyledNames>
      <div className="container">
        <div className="names-container names-container-1">
          <div className="namesSubContainer" ref={namesSubContainer}>
            <Text
              ref={textRef}
              as="h1"
              text="IRVIN Y SONIA"
              className="names"
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
                className="names"
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
