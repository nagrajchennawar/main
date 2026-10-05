import { useState } from 'react'
import { AutorenewRounded, SportsEsportsRounded } from '@mui/icons-material'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { ToolPanel } from './CalculatorUi'

export default function GuessingGame() {
  const [secret, setSecret] = useState(() => Math.floor(Math.random() * 100) + 1)
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState('A number between 1 and 100 is waiting. Make your first guess!')
  const [won, setWon] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    const value = Number(guess)
    if (!Number.isInteger(value) || value < 1 || value > 100 || won) return
    setAttempts((count) => count + 1)
    if (value === secret) { setMessage(`You got it! The number was ${secret}.`); setWon(true) }
    else setMessage(value < secret ? 'A little higher — try again!' : 'A little lower — try again!')
    setGuess('')
  }
  const reset = () => { setSecret(Math.floor(Math.random() * 100) + 1); setGuess(''); setAttempts(0); setMessage('A new number is ready. Make your guess!'); setWon(false) }
  return <ToolPanel subtitle="Guess the secret number from 1 to 100.">
    <Stack spacing={3}>
      <Box sx={{ p: 3, borderRadius: 4, bgcolor: '#edf2ff', textAlign: 'center' }}>
        <SportsEsportsRounded sx={{ fontSize: 44, color: '#4b79d8', mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>{message}</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>Attempts: <strong>{attempts}</strong></Typography>
      </Box>
      <Box component="form" onSubmit={submit} sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField fullWidth label="Your guess" type="number" value={guess} onChange={(event) => setGuess(event.target.value)} inputProps={{ min: 1, max: 100, step: 1 }} disabled={won} />
        <Button type="submit" variant="contained" disabled={won || !guess} sx={{ minWidth: 140 }}>Guess</Button>
      </Box>
      <Button startIcon={<AutorenewRounded />} onClick={reset}>Start a new game</Button>
    </Stack>
  </ToolPanel>
}
