import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Home, About, Contact, UserProfile, PageNotFound } from './pages'

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
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'user-profile',
        element: <UserProfile />,
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
