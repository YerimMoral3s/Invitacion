import Banner from './components/Banner';
import Itinerario from './components/Itinerario';
import { Loader } from './components/Loader';
import NosCasamos from './components/NosCasamos';
import Nosotros from './components/Nosotros';
import PhotosAnimation from './sections/PhotosAnimation';

function App() {
  return (
    <Loader>
      <PhotosAnimation />
      <NosCasamos />
      <Nosotros />
      <Banner />
      <Itinerario />
    </Loader>
  );
}

export default App;
