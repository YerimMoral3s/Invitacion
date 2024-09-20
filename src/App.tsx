import Banner from './components/Banner';
import Form from './components/Form';
import Gallery from './components/Gallery';
import GiftTable from './components/GiftTable';
import Hospitalities from './components/Hospitalities';
import Itinerario from './components/Itinerario';
import { Loader } from './components/Loader';
import NosCasamos from './components/NosCasamos';
import Nosotros from './components/Nosotros';
import Spoty from './components/Spoty';
import PhotosAnimation from './sections/PhotosAnimation';

function App() {
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
    </Loader>
  );
}

export default App;
