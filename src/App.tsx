import Body from './sections/Body';
import NuestraHistoria from './sections/NuestraHistoria';
import PhotosAnimation from './sections/PhotosAnimation';

import logoPlace from './assets/images/place.png';
import logoFinca from './assets/images/finca.png';
import icon1 from './assets/images/contails.png';
import icon2 from './assets/images/sign.png';
import icon3 from './assets/images/brindis.png';
import icon4 from './assets/images/iglesia.png';
import logoLiverpool from './assets/images/liverpool.png';
import logoPalacio from './assets/images/palacio.png';

const CivilObjects = [
  {
    name: 'MainTitle',
    text: 'Lugar y Fecha',
    style: {
      width: '100%',
      textAlign: 'center',
    },
  },
  {
    name: 'Date',
    text: 'Ceremonia Civil',
    month: 'MARZO',
    day: '01',
    year: '2025',
  },

  {
    name: 'ImageCallAction',
    image: logoPlace,
    alt: 'Logo Place',
    buttonText: 'Ver Ubicación',
    href: 'https://goo.gl/maps/7Q3',
  },

  {
    name: 'Schedules',
    element1: {
      img: icon1,
      alt: 'Coctél de Bienvenida',
      title: 'Coctél de Bienvenida',
      schedule: '6:30 PM',
    },
    element2: {
      img: icon2,
      alt: 'Ceremonia Civil',
      title: 'Ceremonia Civil',
      schedule: '7:30 PM',
    },
  },

  {
    name: 'Separator',
    title: 'Coctél',
    href: 'https://www.google.com/maps/dir//formal',
  },
];

const ReligiosaObjects = [
  {
    name: 'MainTitle',
    text: 'Lugar y Fecha',
    style: {
      width: '100%',
      textAlign: 'center',
    },
  },
  {
    name: 'Date',
    text: 'Ceremonia Religiosa',
    month: 'MARZO',
    day: '15',
    year: '2025',
  },

  {
    name: 'ImageCallAction',
    image: logoFinca,
    alt: 'Logo Place',
    buttonText: 'Ver Ubicación',
    href: 'https://goo.gl/maps/7Q3',
  },

  {
    name: 'Schedules',
    element1: {
      img: icon4,
      alt: 'Ceremonia Religiosa',
      title: 'Ceremonia Religiosa',
      schedule: '4:30 PM',
    },
    element2: {
      img: icon3,
      alt: 'Celebraccion',
      title: 'Celebraccion',
      schedule: '6:00 PM',
    },
  },

  {
    name: 'Separator',
    title: 'Formal',
    href: 'https://www.google.com/maps/dir//formal',
  },
];

const GiftObjects = [
  // {
  //   name: 'Imagen',
  //   src: img,
  //   alt: 'Imagen',
  //   style: {
  //     width: '100%',
  //     height: '500px',
  //     objectFit: 'cover',
  //     filter: 'grayscale(1)',
  //   },
  // },
  {
    name: 'GeneralText',
    texts: [
      'Tu compañía es nuestro mejor regalo, pero si gustas tener un detalle con nosotros. Te dejamos estas sugerencias.',
      '¡GRACIAS!',
    ],
  },
  {
    name: 'ImageCallAction',
    image: logoLiverpool,
    alt: 'Logo Place',
    buttonText: 'Ver Mesa de Regalos',
    href: 'https://goo.gl/maps/7Q3',
  },
  {
    name: 'ImageCallAction',
    image: logoPalacio,
    alt: 'Logo Place',
    buttonText: 'Ver Mesa de Regalos',
    href: 'https://goo.gl/maps/7Q3',
  },
  {
    name: 'MainTitle',
    text: 'Opciones de Hospedaje',
    style: {
      width: '100%',
      textAlign: 'center',
    },
  },
];

const Music = [
  {
    name: 'MainTitle',
    text: 'Musica',
    style: {
      width: '100%',
      textAlign: 'center',
    },
  },
  {
    name: 'GeneralText',
    texts: [
      'Cual es tu canción favorita, ¿Cuál te gustaría escuchar en nuestra boda? ¡Déjanos tu sugerencia!',
    ],
  },
  {
    name: 'Spoty',
  },
];

function App() {
  return (
    <>
      <PhotosAnimation />
      <NuestraHistoria />
      <Body InfoList={CivilObjects} />
      <Body InfoList={ReligiosaObjects} />
      <Body InfoList={GiftObjects} />
      <Body InfoList={Music} />
    </>
  );
}

export default App;
