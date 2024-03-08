import styled from 'styled-components';

import { useEffect, useRef } from 'react';
import Text from '../components/Text';
import { colors } from '../assets/theme';

const COMPONENT_HEIGHT = 500;
const NAMES = 'IRVIN & SONIA';

const StyledNames = styled.div`
  display: flex;
  gap: 10px;
  height: 100vh;
  background-color: ${colors.champania};

  .container {
    margin: auto;

    height: ${COMPONENT_HEIGHT}px;
    width: 100%;
    position: relative;

    .names-container {
      position: absolute;
      width: 100%;

      text-align: center;

      .mask {
        overflow: hidden;
        .names {
          line-height: 1;
          font-family: jakarta-extra-light;
          color: ${colors.teja};
          font-size: 5rem;
        }
      }
    }

    .names-container-top {
      top: -100px;
    }

    .names-container-bottom {
      bottom: -100px;
    }
  }

  @media (max-width: 768px) {
    .container {
      .names-container {
        .mask {
          .names {
            font-size: 2.5rem;
          }
        }
      }
    }
  }
`;

const Names = () => {
  const nameContainerTop = useRef<HTMLDivElement>(null);
  const nameContainerBottom = useRef<HTMLDivElement>(null);

  const maskTop = useRef<HTMLDivElement>(null);
  const maskBottom = useRef<HTMLDivElement>(null);

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      nameContainerTop.current &&
      textRef.current &&
      maskTop.current &&
      maskBottom.current
    ) {
      const { height } = textRef.current.getBoundingClientRect();
      const maskHeight = height / 2;

      const distance = COMPONENT_HEIGHT / 2 - height / 2;

      maskTop.current.style.height = `${maskHeight}px`;
      maskBottom.current.style.height = `${maskHeight}px`;

      for (let i = -100; i < distance; i++) {
        setTimeout(() => {
          if (nameContainerTop.current && nameContainerBottom.current) {
            nameContainerTop.current.style.top = `${i}px`;
            nameContainerBottom.current.style.bottom = `${i + 2}px`;
          }
        }, i * 7);
      }
    }
  }, []);

  return (
    <StyledNames>
      <div className="container">
        <div
          className="names-container names-container-top"
          ref={nameContainerTop}
        >
          <div className="mask mask-top" ref={maskTop}>
            <Text
              ref={textRef}
              as="h1"
              text={NAMES}
              className="names fade-in "
            />
          </div>
        </div>
        <div
          className="names-container names-container-bottom"
          ref={nameContainerBottom}
        >
          <div className="mask mask-bottom" ref={maskBottom}>
            <div
              style={{
                position: 'relative',
                height: '100%',
              }}
            >
              <Text
                as="h1"
                text={NAMES}
                className="names fade-in "
                style={{
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  bottom: '100%',
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
