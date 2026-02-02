import { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { Menu as MenuIcon, Bolt, PhoneIphone, Security } from '@mui/icons-material'

function App() {
  const [count, setCount] = useState<number>(0)
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = ['Home', 'About', 'Contact']

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Endfield Infra Helper
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Endfield Infra Helper
          </Typography>
          {isMobile ? (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Button key={item} color="inherit">
                  {item}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', color: 'white', mb: 8 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
              }}
            >
              Welcome to Your Dashboard
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              }}
            >
              A modern, responsive, and mobile-friendly interface built with React, TypeScript, and
              Material-UI
            </Typography>
          </Box>

          {/* Counter Card */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
            <Card
              sx={{
                maxWidth: 400,
                width: '100%',
                boxShadow: 4,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  align="center"
                  sx={{ fontWeight: 'bold' }}
                >
                  Counter Demo
                </Typography>
                <Typography
                  variant="h1"
                  align="center"
                  color="primary"
                  sx={{ my: 3, fontWeight: 'bold' }}
                >
                  {count}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => setCount(count + 1)}
                  >
                    Increment
                  </Button>
                  <Button variant="outlined" fullWidth size="large" onClick={() => setCount(0)}>
                    Reset
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Feature Cards */}
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: 'primary.light',
                        borderRadius: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Bolt sx={{ fontSize: 40, color: 'primary.main' }} />
                    </Box>
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Fast Performance
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Built with Vite for lightning-fast development and optimized production builds.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: 'success.light',
                        borderRadius: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PhoneIphone sx={{ fontSize: 40, color: 'success.main' }} />
                    </Box>
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Mobile Friendly
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fully responsive design that looks great on all devices from phones to desktops.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: 'secondary.light',
                        borderRadius: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Security sx={{ fontSize: 40, color: 'secondary.main' }} />
                    </Box>
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Type-Safe
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Full TypeScript support for enhanced code quality and developer experience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            Built with React, TypeScript, Vite, and Material-UI
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default App
