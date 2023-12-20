import React from 'react'
import { IconButton, Menu, MenuItem, Typography, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const ResponsiveNav = ({ pages, handleCloseNavMenu }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseMenu = () => {
    handleCloseNavMenu()
    setAnchorElNav(null)
  }

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseMenu}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseMenu}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default ResponsiveNav
