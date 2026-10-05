import { useEffect, useRef, useState } from 'react'
import { Button, Chip, Stack, Typography } from '@mui/material'
import ProjectPanel from './ProjectPanel'

const durations = { work: 25 * 60, break: 5 * 60 }

function clock(value) {
  return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`
}

export default function Pomodoro() {
  const [mode, setMode] = useState('work')
  const [remaining, setRemaining] = useState(durations.work)
  const [running, setRunning] = useState(false)
  const endAt = useRef(0)

  useEffect(() => {
    if (!running) return undefined
    const timer = window.setInterval(() => {
      const next = Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000))
      setRemaining(next)
      if (next === 0) {
        const nextMode = mode === 'work' ? 'break' : 'work'
        setMode(nextMode)
        setRemaining(durations[nextMode])
        endAt.current = Date.now() + durations[nextMode] * 1000
        endAt.current = Date.now() + durations[nextMode] * 1000
      }
    }, 200)
    return () => window.clearInterval(timer)
  }, [running, mode])

  const start = () => {
    endAt.current = Date.now() + remaining * 1000
    setRunning(true)
  }
  const pause = () => {
    setRemaining(Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000)))
    setRunning(false)
  }
  const reset = () => {
    setRunning(false)
    setMode('work')
    setRemaining(durations.work)
  }

  return (
    <ProjectPanel>
      <Stack spacing={3} sx={{ py: 2, alignItems: 'center' }}>
        <Chip color={mode === 'work' ? 'primary' : 'success'} label={mode === 'work' ? 'Focus session · 25 min' : 'Break · 5 min'} />
        <Typography aria-live="polite" sx={{ fontSize: { xs: 64, sm: 88 }, fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.05em', color: mode === 'work' ? '#3730a3' : '#138a65' }}>
          {clock(remaining)}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={start} disabled={running}>Start</Button>
          <Button variant="outlined" onClick={pause} disabled={!running}>Pause</Button>
          <Button onClick={reset}>Reset</Button>
        </Stack>
        <Typography variant="body2" color="text.secondary">A completed focus session switches to a 5-minute break.</Typography>
      </Stack>
    </ProjectPanel>
  )
}
