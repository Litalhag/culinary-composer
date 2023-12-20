import React, { useContext } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@mui/material'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import ResponsiveNav from './ResponsiveNav'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const NavHead = () => {
  const { user, logout } = useContext(AuthContext)
  const pages = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  if (user) {
    pages = [...pages, { label: 'User Profile', path: '/user-profile' }]
  }

  return (
    <AppBar position="static" sx={{ background: '#96B6C5' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and title */}
          <RestaurantIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Culinary Composer
          </Typography>

          {/* Responsive navigation */}
          <ResponsiveNav pages={pages} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* Register, Login */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {user ? (
              <>
                <Typography sx={{ mx: 1, color: 'white' }}>
                  {user.name}
                </Typography>
                <Button onClick={logout} color="inherit" sx={{ mx: 1 }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/register"
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  Register
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavHead
