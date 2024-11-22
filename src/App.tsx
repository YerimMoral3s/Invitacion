import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from './components/Loader/Loader';

// Importar componentes
const Invitation = lazy(() => import('./Invitation'));
const Admin = lazy(() => import('./Admin'));
const Directory = lazy(() => import('./Directory')); // Define tu componente Directory
const Charts = lazy(() => import('./Charts')); // Define tu componente Charts

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Invitation />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<Loader />}>
        <Admin />
      </Suspense>
    ),
    children: [
      {
        path: '', // Subruta predeterminada para /admin
        element: (
          <Suspense fallback={<Loader />}>
            <Directory />
          </Suspense>
        ),
      },
      {
        path: 'charts', // Subruta para /admin/charts
        element: (
          <Suspense fallback={<Loader />}>
            <Charts />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
