import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Home, About, PageNotFound, Login, Register } from './pages'

import SharedLayout from './components/SharedLayout'

const routes = [
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]

function App() {
  const router = createBrowserRouter(routes)
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
