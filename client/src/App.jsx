import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import {
  Home,
  About,
  Contact,
  UserProfile,
  PageNotFound,
  Login,
  Register,
} from './pages'

import SharedLayout from './components/SharedLayout'
import { AuthProvider } from './context/AuthContext'

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
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
