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
import { Loader } from './components/Loader';
// import { useSDK } from './components/Sdk';
// import Separator from './components/Separator'

import { useUser } from './components/Sdk';
import Separator from './components/Separator';

import irvinYSon1 from './assets/images/irvYson/1.jpeg';
import irvinYSon3 from './assets/images/irvYson/3.jpeg';
import irvinYSon4 from './assets/images/irvYson/4.jpeg';
import irvinYSon5 from './assets/images/irvYson/6.jpeg';
import irvinYSon7 from './assets/images/irvYson/7.jpeg';
import irvinYSon8 from './assets/images/irvYson/8.jpeg';
import irvinYSon9 from './assets/images/irvYson/9.jpeg';
import irvinYSon10 from './assets/images/irvYson/10.jpeg';
import irvinYSon17 from './assets/images/irvYson/17.jpeg';
import irvinYSon18 from './assets/images/irvYson/18.jpeg';

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
    message: 'Vestimenta',
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
    message: 'Vestimenta',
    href: 'https://www.google.com/maps/dir//formal',
  },
];

const gifts = [
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
    text: 'Galería',
    style: {
      width: '100%',
      textAlign: 'center',
    },
  },
];

const obj1 = [
  {
    name: 'Gallery',
    images: [
      irvinYSon1,
      irvinYSon3,
      irvinYSon4,
      irvinYSon5,
      irvinYSon7,
      irvinYSon8,
      irvinYSon9,
      irvinYSon10,
      irvinYSon17,
      irvinYSon18,
    ],
  },
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
];

const places = [
  {
    // hoteles y hospedajes
    name: 'PlacesToStay',
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
      '¿Cual es tu canción favorita?',
      '¿Cuál te gustaría escuchar en nuestra boda?',
      '¡Déjanos tu sugerencia!',
    ],
  },
];

const obj2 = [
  {
    name: 'Spoty',
  },
  {
    name: 'MainTitle',
    text: 'Confirmación',
    style: {
      width: '100%',
      textAlign: 'center',
    },
  },
  {
    name: 'GeneralText',
    texts: [
      'Para nosotros es muy importante saber si podrás acompañarnos en este día tan especial.',
      '¡Esperamos contar con tu presencia!',
    ],
  },
  {
    name: 'Form',
  },
];

function App() {
  const { data: user } = useUser();

  const getTile = () => {
    if (user) {
      return `¡Muchas Gracias!`;
    }
  };

  const getMessages = () => {
    if (user) {
      if (user.attributes.confirmation) {
        return `${user.attributes.name}, nos alegra mucho que puedas acompañarnos`;
      }

      return `${user.attributes.name}, qué pena que no puedas acompañarnos, te extrañaremos mucho`;
    }
  };

  return (
    <Loader>
      <PhotosAnimation />
      <NuestraHistoria />
      <Body InfoList={CivilObjects} />
      <Body InfoList={ReligiosaObjects} />
      <Body InfoList={gifts} />
      <Body InfoList={obj1} />
      <Body InfoList={places} />
      <Body InfoList={obj2} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {user && <Separator title={getMessages()} message={getTile()} />}
      </div>

      <br />
      <br />
    </Loader>
  );
}

export default App;
