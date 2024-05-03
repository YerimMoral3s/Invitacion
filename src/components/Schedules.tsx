import React, { useCallback } from 'react';
import styled from 'styled-components';
import Container from './Container';
import { colors } from '../assets/theme';
import Text from './Text';

const StyledSchedules = styled.div`
  .container-schedules {
    display: flex;

    max-width: 800px;

    margin-top: 1rem;
    margin-bottom: 1rem;

    .el {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      text-align: center;

      img {
        width: 100%;

        object-fit: cover;
      }

      h3 {
        font-size: 1rem;
        font-family: rosarivo-regular;
      }
      p {
        font-family: rosarivo-regular;
        font-size: 0.8rem;
        margin-top: 10px;
      }
    }

    .line {
      margin: 0 15px;
      height: 100%;
      width: 2px;
      border: 1px solid ${colors.black};

      display: flex;
      flex-direction: column;

      justify-content: space-between;
      align-items: center;

      .circle {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${colors.black};
        margin-top: -1px;
      }

      .circle-2 {
        margin-bottom: -2px;
      }
    }
  }

  @media (min-width: 400px) {
    .container-schedules {
      .el {
        h3 {
          font-size: 1.2rem;
        }
        p {
          font-size: 1rem;
        }
      }
    }
  }

  @media (min-width: 576px) {
    .container-schedules {
      .el {
        h3 {
          font-size: 1.5rem;
        }
        p {
          font-size: 1.2rem;
        }
      }
    }
  }
`;

type SchedulesPropsElment = {
  img: string;
  alt: string;
  title: string;
  schedule: string;
};

type SchedulesProps = {
  element1: SchedulesPropsElment;
  element2: SchedulesPropsElment;
};

const Schedules = (props: SchedulesProps) => {
  const { element1, element2 } = props;
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = React.useState(0);

  const calcHeight = useCallback(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.clientHeight);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('load', calcHeight);
    window.addEventListener('resize', calcHeight);

    return () => {
      window.removeEventListener('load', calcHeight);
      window.removeEventListener('resize', calcHeight);
    };
  }, [calcHeight]);

  return (
    <StyledSchedules className="schedules">
      <Container className="container-schedules">
        <div className="el el-1" ref={cardRef}>
          <img src={element1.img} alt={element1.alt} />

          <Text as="h3" text={element1.title} />
          <Text as="p" text={element1.schedule} />
        </div>
        <div
          className="line"
          style={{
            height: cardHeight,
          }}
        >
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
        <div className="el el-2">
          <img src={element2.img} alt={element2.alt} />

          <Text as="h3" text={element2.title} />
          <Text as="p" text={element2.schedule} />
        </div>
      </Container>
    </StyledSchedules>
  );
};

export default Schedules;
