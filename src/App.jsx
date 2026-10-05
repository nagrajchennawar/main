import { CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import createAppTheme from './theme'

function getInitialMode() {
  try {
    return window.localStorage.getItem('color-mode') === 'dark' ? 'dark' : 'light'
  } catch (error) {
    console.error('Unable to read the saved color mode.', error)
    return 'light'
  }
}

function App() {
  const [mode, setMode] = useState(getInitialMode)
  const theme = useMemo(() => createAppTheme(mode), [mode])

  useEffect(() => {
    try {
      window.localStorage.setItem('color-mode', mode)
    } catch (error) {
      console.error('Unable to save the selected color mode.', error)
    }
  }, [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes mode={mode} onToggleMode={() => setMode((current) => current === 'light' ? 'dark' : 'light')} />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
