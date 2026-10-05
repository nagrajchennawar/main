import { createTheme } from '@mui/material/styles'

export default function createAppTheme(mode = 'light') {
  const darkMode = mode === 'dark'

  return createTheme({
  palette: {
    mode,
    primary: {
      main: '#4f46e5',
      light: '#818cf8',
      dark: '#3730a3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f97316',
      light: '#fb923c',
      dark: '#c2410c',
      contrastText: '#ffffff',
    },
    background: {
      default: darkMode ? '#0b1120' : '#f3f6fb',
      paper: darkMode ? '#111827' : '#ffffff',
    },
    text: {
      primary: darkMode ? '#f1f5f9' : '#111827',
      secondary: darkMode ? '#a3afc2' : '#64748b',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
    info: {
      main: '#3b82f6',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.25,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.3rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.1rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: darkMode ? '#0b1120' : '#f3f6fb',
          color: darkMode ? '#f1f5f9' : '#111827',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          boxShadow: 'none',
          padding: '0.7rem 1.2rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: darkMode ? '#111827' : '#ffffff',
          boxShadow: darkMode ? '0 10px 30px rgba(0, 0, 0, 0.24)' : '0 10px 30px rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorDefault: {
          color: darkMode ? '#1f2937' : undefined,
          backgroundColor: darkMode ? '#e2e8f0' : undefined,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${darkMode ? 'rgba(148, 163, 184, 0.16)' : 'rgba(148, 163, 184, 0.22)'}`,
        },
      },
    },
  },
  })
}
