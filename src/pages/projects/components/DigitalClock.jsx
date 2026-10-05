import { useEffect, useState } from 'react'
import { FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import ProjectPanel from './ProjectPanel'

export default function DigitalClock() {
  const [now, setNow] = useState(() => new Date())
  const [twentyFourHour, setTwentyFourHour] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <ProjectPanel>
      <Stack spacing={2} sx={{ py: 4, alignItems: 'center' }}>
        <Typography sx={{ fontSize: { xs: 48, sm: 72 }, fontWeight: 800, letterSpacing: '-0.06em', fontVariantNumeric: 'tabular-nums', color: '#3730a3' }}>
          {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: !twentyFourHour })}
        </Typography>
        <Typography color="text.secondary">{now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
        <FormControlLabel control={<Switch checked={twentyFourHour} onChange={(event) => setTwentyFourHour(event.target.checked)} />} label="24-hour format" />
      </Stack>
    </ProjectPanel>
  )
}
