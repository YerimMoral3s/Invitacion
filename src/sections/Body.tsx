import styled from 'styled-components';

import MainTitle from '../components/MainTitle';
import Date from '../components/Date';
import ImageCallAction from '../components/ImageCallAction';
import Schedules from '../components/Schedules';
import Separator from '../components/Separator';

import Imagen from '../components/Imagen';
import GeneralText from '../components/GeneralText';

const StyledBody = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

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
    return <></>;
  });

  return <StyledBody>{Comps}</StyledBody>;
}

export default Body;
