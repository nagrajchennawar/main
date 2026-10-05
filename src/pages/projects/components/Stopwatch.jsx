import { useEffect, useRef, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import ProjectPanel from './ProjectPanel'

function formatTime(ms) {
  const centiseconds = Math.floor(ms / 10) % 100
  const seconds = Math.floor(ms / 1000) % 60
  const minutes = Math.floor(ms / 60000) % 60
  const hours = Math.floor(ms / 3600000)
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`
}

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const startedAt = useRef(0)
  const saved = useRef(0)

  useEffect(() => {
    if (!running) return undefined
    startedAt.current = Date.now()
    const timer = window.setInterval(() => setElapsed(saved.current + Date.now() - startedAt.current), 20)
    return () => window.clearInterval(timer)
  }, [running])

  const pause = () => {
    saved.current = elapsed
    setRunning(false)
  }
  const reset = () => {
    setRunning(false)
    saved.current = 0
    setElapsed(0)
    setLaps([])
  }

  return (
    <ProjectPanel>
      <Stack spacing={3} sx={{ alignItems: 'center' }}>
        <Typography sx={{ py: 2, fontSize: { xs: 42, sm: 64 }, fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.04em' }}>{formatTime(elapsed)}</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => setRunning(true)} disabled={running}>Start</Button>
          <Button variant="outlined" onClick={pause} disabled={!running}>Pause</Button>
          <Button variant="text" onClick={reset}>Reset</Button>
          <Button variant="outlined" onClick={() => setLaps((items) => [elapsed, ...items])} disabled={elapsed === 0}>Lap</Button>
        </Stack>
        {laps.map((lap, index) => <Typography key={`${index}-${lap}`} variant="body2" color="text.secondary">Lap {laps.length - index}: {formatTime(lap)}</Typography>)}
      </Stack>
    </ProjectPanel>
  )
}
