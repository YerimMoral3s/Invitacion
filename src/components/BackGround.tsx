import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import cloud from '../assets/images/cloud.png';

const StyledBackGround = styled.div`
  background:
    url(${cloud}) no-repeat top -100px right 100px fixed,
    url(${cloud}) no-repeat bottom -200px left 50px fixed;

  background-size: 600px;

  @media (min-width: 450px) {
    background:
      url(${cloud}) no-repeat top -200px right 100px fixed,
      url(${cloud}) no-repeat bottom -300px left 50px fixed;

    background-size: 800px;
  }

  @media (min-width: 576px) {
    background:
      url(${cloud}) no-repeat top -300px right 150px fixed,
      url(${cloud}) no-repeat bottom -400px left 100px fixed;

    background-size: 1000px;
  }

  @media (min-width: 768px) {
    background:
      url(${cloud}) no-repeat top -400px right 250px fixed,
      url(${cloud}) no-repeat bottom -500px left 200px fixed;

    background-size: 1200px;
  }

  @media (min-width: 992px) {
    background:
      url(${cloud}) no-repeat top -500px right 300px fixed,
      url(${cloud}) no-repeat bottom -600px left 250px fixed;

    background-size: 1400px;
  }

  @media (min-width: 1200px) {
    background:
      url(${cloud}) no-repeat top -600px right 350px fixed,
      url(${cloud}) no-repeat bottom -700px left 300px fixed;

    background-size: 1600px;
  }

  @media (min-width: 1400px) {
    background:
      url(${cloud}) no-repeat top -700px right 400px fixed,
      url(${cloud}) no-repeat bottom -800px left 350px fixed;

    background-size: 1600px;
  }
`;

export default function BackGround(props: PropsWithChildren) {
  return <StyledBackGround>{props.children}</StyledBackGround>;
}
