import styled from 'styled-components';

import cloud from '../assets/images/cloud.png';

import MainTitle from '../components/MainTitle';
import Date from '../components/Date';
import ImageCallAction from '../components/ImageCallAction';
import Schedules from '../components/Schedules';
import Separator from '../components/Separator';

import Imagen from '../components/Imagen';
import GeneralText from '../components/GeneralText';
import Spoty from '../components/Spoty';
import PlacesToStay from '../components/PlacesToStay';
import Gallery from '../components/Gallery';

const StyledBody = styled.section`
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
  { name: 'MainTitle', component: MainTitle },
  { name: 'Date', component: Date },
  { name: 'ImageCallAction', component: ImageCallAction },
  { name: 'Schedules', component: Schedules },
  { name: 'Separator', component: Separator },
  { name: 'Imagen', component: Imagen },
  { name: 'GeneralText', component: GeneralText },
  { name: 'Spoty', component: Spoty },
  { name: 'PlacesToStay', component: PlacesToStay },
  { name: 'Gallery', component: Gallery },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Body(props: { InfoList: any[] }) {
  const Comps = props.InfoList.map((element, idx) => {
    const Component = Components.find(
      (c) => c.name === element.name,
    )?.component;

    if (Component) {
      const { name, ...rest } = element;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <Component {...(rest as any)} id={name} key={name + '_' + idx} />;
    }

    return null;
  });

  return <StyledBody>{Comps}</StyledBody>;
}

export default Body;
