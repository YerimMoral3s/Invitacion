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

const giftsLocalities = [
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
];

const placesAndSpoty = [
  {
    name: 'MainTitle',
    text: 'Opciones de Hospedaje',
    style: {
      width: '100%',
      textAlign: 'center',
    },
  },
  {
    name: 'GeneralText',
    texts: [
      'Estas son algunas opciones de hospedaje en la zona',
      '¡Reserva con tiempo!',
    ],
  },
  {
    // hoteles y hospedajes
    name: 'PlacesToStay',
    places: [
      {
        name: 'Hotel 1',
        image: 'https://picsum.photos/500',
        address: 'Dirección 1',
        phone: '1234567890',
        email: 'email@test.com',
        website: 'https://www.google.com',
        airbnb: 'https://www.airbnb.com',
        type: 'hotel',
      },
      {
        name: 'Hotel 2',
        image: 'https://picsum.photos/500',
        address: 'Dirección 2',
        phone: '1234567890',
        website: 'https://www.google.com',
        type: 'resort',
      },
      {
        name: 'Hotel 3',
        image: 'https://picsum.photos/500',
        address: 'Dirección 3',
        email: 'email@test.com',
        type: 'resort',
      },
    ],
  },
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
      'Cual es tu canción favorita,',
      '¿Cuál te gustaría escuchar en nuestra boda?,',
      '¡Déjanos tu sugerencia!',
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
      <Body InfoList={giftsLocalities} />
      <Body InfoList={placesAndSpoty} />
    </>
  );
}

export default App;
