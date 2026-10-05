import { useState } from 'react'
import { Alert, Box, Button, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import ProjectPanel from '../../projects/components/ProjectPanel'

const steps = ['Your details', 'Contact info', 'Review']

export default function MultiStepForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', role: '' })
  const [submitted, setSubmitted] = useState(false)
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))
  const next = (event) => {
    event.preventDefault()
    if (step < steps.length - 1) setStep((current) => current + 1)
    else setSubmitted(true)
  }
  return <ProjectPanel>
    <Stack spacing={2.5}>
      <Box><Typography variant="body2" color="text.secondary">Step {step + 1} of {steps.length} · {steps[step]}</Typography><LinearProgress variant="determinate" value={((step + 1) / steps.length) * 100} sx={{ mt: 1, height: 8, borderRadius: 5 }} /></Box>
      {submitted ? <Alert severity="success">Thanks, {form.name}! Your information has been submitted.</Alert> : (
        <Box component="form" onSubmit={next}>
          <Stack spacing={2}>
            {step === 0 && <TextField label="Full name" value={form.name} onChange={update('name')} required autoComplete="name" />}
            {step === 1 && <><TextField label="Email address" type="email" value={form.email} onChange={update('email')} required autoComplete="email" /><TextField label="Your role" value={form.role} onChange={update('role')} required /></>}
            {step === 2 && <Box sx={{ p: 2.5, bgcolor: '#f8f9fc', borderRadius: 3 }}><Typography sx={{ fontWeight: 700, mb: 1 }}>Review your details</Typography><Typography>Name: {form.name}</Typography><Typography>Email: {form.email}</Typography><Typography>Role: {form.role}</Typography></Box>}
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}><Button disabled={step === 0} onClick={() => setStep((current) => current - 1)}>Back</Button><Button type="submit" variant="contained">{step === steps.length - 1 ? 'Submit' : 'Continue'}</Button></Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  </ProjectPanel>
}
