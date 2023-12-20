import React from 'react'
import { Outlet } from 'react-router-dom'
import NavHead from './navbar/NavHead'
import Footer from './Footer'

const SharedLayout = () => {
  return (
    <>
      <NavHead />

      <Outlet />

      <Footer />
    </>
  )
}
export default SharedLayout
