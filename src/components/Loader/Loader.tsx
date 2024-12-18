import { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';

import { colors } from '../theme';
import { loaderStore } from './LoaderStore';

export const Loader = (props: PropsWithChildren) => {
  const [isVisible, setIsVisible] = useState(true);
  const loader = loaderStore();

  useEffect(() => {
    if (loader.isLoading) {
      document.body.style.overflow = 'hidden';
      setIsVisible(true);
    } else {
      const miliseconds = 1500;
      const loaderElement = document.getElementById('loader-wed');

      if (loaderElement) {
        setTimeout(() => {
          document.body.style.overflow = 'auto';
          loaderElement.style.transition = `opacity ${miliseconds}ms`;
          loaderElement.style.opacity = '0';

          setTimeout(() => {
            setIsVisible(false);
          }, miliseconds + 100);
        }, miliseconds);
      }
    }
  }, [loader.isLoading]);

  return (
    <>
      {isVisible && <LoaderComponent />}
      {props.children}
    </>
  );
};

export const LoaderComponent = () => (
  <StyledLoader id="loader-wed" className="fade-in-fast">
    <span className="loader"></span>
  </StyledLoader>
);

const StyledLoader = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 1;

  .loader {
    position: relative;
    width: 64px;
    height: 64px;
    background: white;
    border-radius: 50%;
    overflow: hidden;
  }

  .loader:after {
    content: '';
    position: absolute;
    inset: 8px;
    margin: auto;
    background: white;
    border-radius: 50%;
  }

  .loader:before {
    content: '';
    position: absolute;
    inset: 0px;
    margin: auto;
    background: ${colors.gray};
    animation: crlMugLoader 2s linear infinite alternate;
  }

  @keyframes crlMugLoader {
    0%,
    10% {
      transform: translateY(64px);
    }
    90%,
    100% {
      transform: translateY(0px);
    }
  }
`;
