import { useState } from 'react'
import { Alert, Stack, TextField } from '@mui/material'
import { ResultPanel, ToolPanel } from './CalculatorUi'

export default function AgeCalculator() {
  const [dob, setDob] = useState('')
  let result = null
  if (dob) {
    const birth = new Date(`${dob}T00:00:00`)
    const today = new Date()
    if (!Number.isNaN(birth.getTime()) && birth <= today) {
      let years = today.getFullYear() - birth.getFullYear()
      let months = today.getMonth() - birth.getMonth()
      let days = today.getDate() - birth.getDate()
      if (days < 0) {
        months -= 1
        const daysInPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
        days += daysInPreviousMonth
      }
      if (months < 0) { years -= 1; months += 12 }
      result = { years, months, days }
    }
  }
  return <ToolPanel subtitle="Choose your date of birth to see your exact age.">
    <Stack spacing={3}>
      <TextField fullWidth type="date" label="Date of birth" value={dob} onChange={(event) => setDob(event.target.value)} InputLabelProps={{ shrink: true }} inputProps={{ max: new Date().toISOString().slice(0, 10) }} />
      {result ? <ResultPanel label="Your age" value={`${result.years} years`} detail={`${result.months} months and ${result.days} days`} color="#d94f91" /> : dob ? <Alert severity="warning">Please choose a valid date in the past.</Alert> : <Alert severity="info">Your age will appear here once you select a date.</Alert>}
    </Stack>
  </ToolPanel>
}
