import { useState } from 'react'
import { ContentCopyRounded, RefreshRounded } from '@mui/icons-material'
import { Alert, Button, Checkbox, FormControlLabel, Slider, Stack, TextField, Typography } from '@mui/material'
import ProjectPanel from './ProjectPanel'

const characterSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?',
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true })
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState('')

  const generate = () => {
    const selected = Object.entries(options).filter(([, enabled]) => enabled).map(([key]) => characterSets[key])
    if (!selected.length) {
      setFeedback('Select at least one character type.')
      return
    }
    const pool = selected.join('')
    const bytes = new Uint32Array(length)
    window.crypto.getRandomValues(bytes)
    const chars = selected.map((set, index) => set[bytes[index] % set.length])
    while (chars.length < length) chars.push(pool[bytes[chars.length] % pool.length])
    for (let i = chars.length - 1; i > 0; i -= 1) {
      const j = bytes[i % bytes.length] % (i + 1)
      ;[chars[i], chars[j]] = [chars[j], chars[i]]
    }
    setPassword(chars.join(''))
    setFeedback('')
  }

  const copyPassword = async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setFeedback('Password copied to clipboard.')
    } catch {
      setFeedback('Clipboard access is unavailable. Select and copy the password manually.')
    }
  }

  return (
    <ProjectPanel>
      <Stack spacing={2}>
        <Typography sx={{ fontWeight: 700 }}>Password length: {length}</Typography>
        <Slider value={length} onChange={(_, value) => setLength(value)} min={6} max={64} valueLabelDisplay="auto" />
        <Stack direction={{ xs: 'column', sm: 'row' }} flexWrap="wrap" useFlexGap>
          {Object.entries(options).map(([key, checked]) => (
            <FormControlLabel key={key} control={<Checkbox checked={checked} onChange={(event) => setOptions((current) => ({ ...current, [key]: event.target.checked }))} />} label={{ uppercase: 'Uppercase', lowercase: 'Lowercase', numbers: 'Numbers', symbols: 'Special characters' }[key]} />
          ))}
        </Stack>
        <TextField fullWidth label="Generated password" value={password} slotProps={{ input: { readOnly: true } }} />
        <Stack direction="row" spacing={1}>
          <Button fullWidth variant="contained" startIcon={<RefreshRounded />} onClick={generate}>Generate</Button>
          <Button fullWidth variant="outlined" startIcon={<ContentCopyRounded />} onClick={copyPassword} disabled={!password}>Copy</Button>
        </Stack>
        {feedback && <Alert severity={feedback.startsWith('Password copied') ? 'success' : 'warning'}>{feedback}</Alert>}
      </Stack>
    </ProjectPanel>
  )
}
