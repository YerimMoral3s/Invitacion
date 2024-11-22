import Banner from './components/Banner';
import Footer from './components/Footer';
import Form from './components/Form';
import Gallery from './components/Gallery';
import GiftTable from './components/GiftTable';
import Hospitalities from './components/Hospitalities';
import Itinerario from './components/Itinerario';

import NosCasamos from './components/NosCasamos';
import Nosotros from './components/Nosotros';
import Spoty from './components/Spoty';
import PhotosAnimation from './components/PhotosAnimation';
import { Loader } from './components/Loader';

function Invitation() {
  return (
    <Loader>
      <PhotosAnimation />
      <NosCasamos />
      <Nosotros />
      <Banner />
      <Itinerario />
      <GiftTable />
      <Gallery />
      <Hospitalities />
      <Spoty />
      <Form />
      <Footer />
    </Loader>
  );
}

export default Invitation;
