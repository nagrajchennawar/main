import { useState } from 'react'
import { ContentCopyRounded } from '@mui/icons-material'
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'
import ProjectPanel from './ProjectPanel'

function toRgb(hex) {
  const value = hex.replace('#', '')
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16))
}

export default function ColorPicker() {
  const [color, setColor] = useState('#5B5CE2')
  const [feedback, setFeedback] = useState('')
  const rgb = toRgb(color)

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
      setFeedback(`${value} copied to clipboard.`)
    } catch {
      setFeedback('Clipboard access is unavailable. Select the color code and copy it manually.')
    }
  }

  return (
    <ProjectPanel>
      <Stack spacing={3} sx={{ alignItems: 'center' }}>
        <Box sx={{ width: '100%', height: 190, borderRadius: 4, bgcolor: color, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)' }} />
        <Button component="label" variant="contained">Choose a color<input type="color" value={color} onChange={(event) => { setColor(event.target.value.toUpperCase()); setFeedback('') }} hidden /></Button>
        <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          {[['HEX', color], ['RGB', `rgb(${rgb.join(', ')})`]].map(([label, value]) => (
            <TextField key={label} label={label} value={value} slotProps={{ input: { readOnly: true, endAdornment: <Button aria-label={`Copy ${label}`} onClick={() => copy(value)}><ContentCopyRounded fontSize="small" /></Button> } }} />
          ))}
        </Box>
        {feedback && <Alert severity={feedback.endsWith('copied to clipboard.') ? 'success' : 'warning'} sx={{ width: '100%' }}>{feedback}</Alert>}
        <Typography variant="body2" color="text.secondary">Click either color code to copy it.</Typography>
      </Stack>
    </ProjectPanel>
  )
}
