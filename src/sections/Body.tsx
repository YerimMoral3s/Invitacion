import styled from 'styled-components';

import MainTitle from '../components/MainTitle';
import Date from '../components/Date';
import ImageCallAction from '../components/ImageCallAction';
import Schedules from '../components/Schedules';
import Separator from '../components/Separator';

import cloud from '../assets/images/cloud.png';
import Imagen from '../components/Imagen';
import GeneralText from '../components/GeneralText';

const StyledCivilCeremony = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background:
    url(${cloud}) no-repeat left -300px top 0px,
    url(${cloud}) no-repeat right -300px bottom -120px;

  background-size: 700px;

  @media (min-width: 450px) {
    background-size: 800px;
  }

  @media (min-width: 576px) {
    background:
      url(${cloud}) no-repeat left -300px top 0px,
      url(${cloud}) no-repeat right -300px bottom -150px;
    background-size: 900px;
  }

  @media (min-width: 768px) {
    background-size: 1000px;
  }

  @media (min-width: 992px) {
    background-size: 1100px;
  }

  @media (min-width: 1200px) {
    background:
      url(${cloud}) no-repeat left -500px top -200px,
      url(${cloud}) no-repeat right -500px bottom -100px;

    background-size: 1200px;
  }

  // *{
  //   border: 1px solid red;
  // }
`;

const Components = [
  MainTitle,
  Date,
  ImageCallAction,
  Schedules,
  Separator,
  Imagen,
  GeneralText,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CivilCeremony(props: { InfoList: any[] }) {
  const Comps = props.InfoList.map((element, idx) => {
    const Component = Components.find((c) => c.name === element.name);

    if (Component) {
      const { name, ...rest } = element;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <Component {...(rest as any)} id={name} key={name + '_' + idx} />;
    }
    return <></>;
  });

  return <StyledCivilCeremony>{Comps}</StyledCivilCeremony>;
}

export default CivilCeremony;
