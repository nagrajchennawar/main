import { useState } from 'react'
import { Alert, Button, Stack, TextField } from '@mui/material'
import ProjectPanel from '../../projects/components/ProjectPanel'

export default function FormValidation() {
  const [submitted, setSubmitted] = useState(false)
  const [success, setSuccess] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    if (data.get('password') !== data.get('confirmPassword')) {
      setSuccess(false)
      setSubmitted(true)
      return
    }
    setSuccess(true)
    setSubmitted(true)
    form.reset()
  }
  return <ProjectPanel>
    <Stack component="form" spacing={2} onSubmit={submit} sx={{ maxWidth: 520, mx: 'auto' }}>
      <TextField name="name" label="Full name" required inputProps={{ minLength: 2 }} />
      <TextField name="email" label="Email address" type="email" required />
      <TextField name="password" label="Password" type="password" required inputProps={{ minLength: 8 }} helperText="At least 8 characters" />
      <TextField name="confirmPassword" label="Confirm password" type="password" required />
      <Button variant="contained" type="submit">Validate form</Button>
      {submitted && <Alert severity={success ? 'success' : 'error'}>{success ? 'Form validated successfully.' : 'Passwords must match. Please try again.'}</Alert>}
    </Stack>
  </ProjectPanel>
}
