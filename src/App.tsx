import { Loader } from './components/Loader';
import NosCasamos from './components/NosCasamos';
import PhotosAnimation from './sections/PhotosAnimation';

function App() {
  return (
    <Loader>
      <PhotosAnimation />
      <NosCasamos />
    </Loader>
  );
}

export default App;
