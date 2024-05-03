import React from 'react';
import SubTitle from './SubTitle';
import Text from './Text';
import styled from 'styled-components';
import Container from './Container';
import icon from '../assets/images/flower4.png';

const StyledDate = styled.div`
  width: 100%;
  text-align: center;

  background: url(${icon}) no-repeat right -120px top -45px;
  background-size: 230px;
  padding-top: 1rem;
  padding-bottom: 1rem;

  .container {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .date-container {
    display: flex;
    justify-content: center;
    gap: 0.2rem;
    font-size: 1.5rem;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;

    .month,
    .year {
      border-top: 2px solid black;
      border-bottom: 2px solid black;
      width: 50%;
    }

    .month,
    .day,
    .year {
      h2 {
        text-transform: uppercase;

        line-height: 1.2;
      }
    }
  }

  @media (min-width: 576px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
    background: url(${icon}) no-repeat right -120px top -20px;
    background-size: 260px;
  }

  @media (min-width: 768px) {
    background: url(${icon}) no-repeat right -100px top -10px;
    background-size: 280px;
    .date-container {
      font-size: 2rem;
    }
  }

  @media (min-width: 992px) {
    padding-top: 3rem;
    background: url(${icon}) no-repeat right 0px top -35px;
    background-size: 300px;
  }
`;

const Date = (props: {
  text: string;
  day: string;
  month: string;
  year: string;
}) => {
  return (
    <StyledDate className="date">
      <Container>
        <SubTitle text={props.text} />

        <div className="date-container">
          <div className="month">
            <Text as="h2" text={props.month} />
          </div>
          <div className="day">
            <Text as="h2" text={props.day} />
          </div>
          <div className="year">
            <Text as="h2" text={props.year} />
          </div>
        </div>
      </Container>
    </StyledDate>
  );
};

export default Date;
