import SubTitle from './SubTitle';
import Text from './Text';
import styled from 'styled-components';
import Container from './Container';
import icon from '../assets/images/flower4.png';

const StyledDate = styled.div`
  width: 100%;
  text-align: center;

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

  .date-icon {
    background: url(${icon}) no-repeat center right -20%;
    background-size: 150px;

    width: 100%;
    height: 160px;

    position: absolute;
    top: -90px;
    z-index: -1;
  }

  @media (min-width: 450px) {
    .date-icon {
      background: url(${icon}) no-repeat center right -30%;
      background-size: 200px;
      height: 200px;

      top: -120px;
    }
  }

  @media (min-width: 576px) {
    .date-icon {
      background: url(${icon}) no-repeat center right -20%;
      background-size: 220px;

      top: -140px;
    }
  }

  @media (min-width: 768px) {
    .date-icon {
      background: url(${icon}) no-repeat center right -20%;
      background-size: 250px;

      top: -150px;
    }

    .date-container {
      font-size: 2rem;
    }
  }
  @media (min-width: 992px) {
    .date-icon {
      background: url(${icon}) no-repeat center right -20%;
      background-size: 300px;
      height: 300px;

      top: -160px;
    }

    .date-container {
      font-size: 2.5rem;
    }
  }
  @media (min-width: 1200px) {
    .date-icon {
      background: url(${icon}) no-repeat center right;
      background-size: 350px;
      height: 350px;

      top: -180px;
    }
  }
`;

const Date = (props: {
  text: string;
  day: string;
  month: string;
  year: string;
}) => {
  return (
    <StyledDate className="date" style={{ position: 'relative' }}>
      <div className="date-icon"></div>
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
