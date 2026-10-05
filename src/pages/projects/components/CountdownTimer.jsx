import { useEffect, useRef, useState } from 'react'
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'
import ProjectPanel from './ProjectPanel'

function clock(value) {
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = value % 60
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':')
}

export default function CountdownTimer() {
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('5')
  const [seconds, setSeconds] = useState('0')
  const [remaining, setRemaining] = useState(null)
  const [running, setRunning] = useState(false)
  const endAt = useRef(0)

  useEffect(() => {
    if (!running) return undefined
    const timer = window.setInterval(() => {
      const next = Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000))
      setRemaining(next)
      if (next === 0) setRunning(false)
    }, 200)
    return () => window.clearInterval(timer)
  }, [running])

  const start = () => {
    const initial = remaining ?? (Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds))
    if (initial <= 0) return
    setRemaining(initial)
    endAt.current = Date.now() + initial * 1000
    setRunning(true)
  }
  const pause = () => {
    if (remaining !== null) setRemaining(Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000)))
    setRunning(false)
  }
  const reset = () => {
    setRunning(false)
    setRemaining(null)
  }

  return (
    <ProjectPanel>
      <Stack spacing={3} sx={{ alignItems: 'center' }}>
        <Typography aria-live="polite" sx={{ fontSize: { xs: 52, sm: 76 }, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: remaining === 0 ? '#dc2626' : '#3730a3' }}>
          {clock(remaining ?? (Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)))}
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 1.5, width: '100%' }}>
          {[['Hours', hours, setHours], ['Minutes', minutes, setMinutes], ['Seconds', seconds, setSeconds]].map(([label, value, setter]) => (
            <TextField key={label} label={label} type="number" value={value} onChange={(event) => setter(event.target.value)} disabled={running || remaining !== null} inputProps={{ min: 0, step: 1 }} />
          ))}
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={start} disabled={running}>Start</Button>
          <Button variant="outlined" onClick={pause} disabled={!running}>Pause</Button>
          <Button onClick={reset}>Reset</Button>
        </Stack>
        {remaining === 0 && <Alert severity="success">Time is up!</Alert>}
      </Stack>
    </ProjectPanel>
  )
}
