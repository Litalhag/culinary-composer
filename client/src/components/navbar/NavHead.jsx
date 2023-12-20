import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import ResponsiveNav from './ResponsiveNav'
import { Link } from 'react-router-dom'

const NavHead = () => {
  const pages = ['Home', 'About', 'Recipe Composer', 'Contact']

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
            href="#app-bar-with-responsive-menu"
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
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Register, Login) */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Button component={Link} to="/register" color="inherit" sx={{ mx: 1 }}>
              Register
            </Button>
            <Button component={Link} to="/login" color="inherit" sx={{ mx: 1 }}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavHead
