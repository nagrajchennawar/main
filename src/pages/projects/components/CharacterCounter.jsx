import { useState } from 'react'
import { Box, Stack, TextField, Typography } from '@mui/material'
import ProjectPanel from './ProjectPanel'

const LIMIT = 500

export default function CharacterCounter() {
  const [text, setText] = useState('')
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const sentences = text.trim() ? (text.trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter((sentence) => sentence.trim()).length : 0
  const stats = [
    { label: 'Characters', value: text.length },
    { label: 'Words', value: words },
    { label: 'Sentences', value: sentences },
    { label: 'Remaining', value: LIMIT - text.length },
  ]

  return (
    <ProjectPanel>
      <Stack spacing={2.5}>
        <TextField fullWidth multiline minRows={7} label="Start typing" placeholder="Write or paste your text here..." value={text} onChange={(event) => setText(event.target.value.slice(0, LIMIT))} />
        <Typography variant="caption" color="text.secondary" align="right">{text.length} / {LIMIT} characters</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(4, minmax(0, 1fr))' }, gap: 1.5 }}>
          {stats.map((stat) => (
            <Box key={stat.label} sx={{ p: 2, textAlign: 'center', borderRadius: 3, bgcolor: 'action.hover' }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#4f46e5' }}>{stat.value}</Typography>
              <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </ProjectPanel>
  )
}
