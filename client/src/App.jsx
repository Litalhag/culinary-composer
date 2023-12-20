import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import {
  Home,
  about
} from './pages';

import SharedLayout from './components/SharedLayout';


const routes = [
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }

];

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

