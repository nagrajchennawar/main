import { DashboardRounded, SettingsRounded, TrendingUpRounded, PeopleAltRounded, MenuRounded } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const drawerWidth = 240

const navItems = [
  { label: 'Dashboard', path: '/', icon: DashboardRounded },
  { label: 'Users', path: '/users', icon: PeopleAltRounded },
  { label: 'Settings', path: '/settings', icon: SettingsRounded },
]

export default function MainLayout() {
  const theme = useTheme()
  const location = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const drawerContent = (
    <Box sx={{ height: '100%', backgroundColor: 'background.paper' }}>
      <Toolbar sx={{ minHeight: 84 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Northstar
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        {navItems.map(({ label, path, icon: Icon }) => {
          const selected = location.pathname === path

          return (
            <ListItem key={path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={path}
                onClick={() => isMobile && setMobileOpen(false)}
                selected={selected}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(79, 70, 229, 0.08)',
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: selected ? 'primary.main' : 'text.secondary',
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: selected ? 700 : 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Box sx={{ px: 2, pb: 2, mt: 'auto' }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(249, 115, 22, 0.12))',
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendingUpRounded fontSize="small" color="primary" />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Performance
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Q3 pipeline is trending ahead of target.
          </Typography>
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          color: 'text.primary',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.18)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: 78 }}>
          {isMobile ? (
            <IconButton aria-label="open drawer" edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}>
              <MenuRounded />
            </IconButton>
          ) : null}

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Workspace Overview
          </Typography>

          <Button variant="contained" color="primary">
            New report
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: 'background.paper',
              },
            }}
            open
          >
            {drawerContent}
          </Drawer>
        )}
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, minWidth: 0 }}>
        <Toolbar sx={{ minHeight: 78 }} />
        <Outlet />
      </Box>
    </Box>
  )
}
