import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './pages/layout/app';
import { Home } from './pages/app/home';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
