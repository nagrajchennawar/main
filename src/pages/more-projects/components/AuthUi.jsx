import { useState } from 'react'
import { Alert, Button, Link, Stack, TextField, Typography } from '@mui/material'
import ProjectPanel from '../../projects/components/ProjectPanel'

export default function AuthUi() {
  const [mode, setMode] = useState('login')
  const [message, setMessage] = useState('')
  const isRegister = mode === 'register'
  const submit = (event) => {
    event.preventDefault()
    setMessage(`${isRegister ? 'Registration' : 'Login'} form submitted. Connect an authentication service to enable accounts.`)
  }
  return <ProjectPanel>
    <Stack component="form" spacing={2} onSubmit={submit} sx={{ maxWidth: 440, mx: 'auto' }}>
      <Typography variant="h5" sx={{ fontWeight: 800 }}>{isRegister ? 'Create your account' : 'Welcome back'}</Typography>
      <Typography color="text.secondary">{isRegister ? 'Register to get started.' : 'Sign in to continue.'}</Typography>
      {isRegister && <TextField label="Name" autoComplete="name" required />}
      <TextField label="Email" type="email" autoComplete="email" required />
      <TextField label="Password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} inputProps={{ minLength: 8 }} required />
      <Button type="submit" variant="contained" size="large">{isRegister ? 'Register' : 'Log in'}</Button>
      {message && <Alert severity="info">{message}</Alert>}
      <Typography variant="body2" align="center">{isRegister ? 'Already have an account? ' : 'New here? '}<Link component="button" type="button" onClick={() => { setMode(isRegister ? 'login' : 'register'); setMessage('') }}>{isRegister ? 'Log in' : 'Create an account'}</Link></Typography>
    </Stack>
  </ProjectPanel>
}
