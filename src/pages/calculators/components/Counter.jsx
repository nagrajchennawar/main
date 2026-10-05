import { useState } from 'react'
import { AutorenewRounded } from '@mui/icons-material'
import { Button, Stack, TextField } from '@mui/material'
import { ResultPanel, ToolPanel } from './CalculatorUi'

export default function Counter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState('1')
  const amount = Number(step) > 0 ? Number(step) : 1
  return <ToolPanel subtitle="Set your step, then count up or down.">
    <Stack spacing={3} alignItems="center">
      <ResultPanel label="Current count" value={count.toLocaleString()} color="#dd6a48" />
      <TextField label="Step value" type="number" value={step} onChange={(event) => setStep(event.target.value)} inputProps={{ min: 1, step: 1 }} sx={{ width: '100%' }} />
      <Stack direction="row" spacing={1.5} sx={{ width: '100%' }}>
        <Button fullWidth variant="outlined" size="large" onClick={() => setCount((value) => value - amount)}>− Decrement</Button>
        <Button fullWidth variant="contained" size="large" onClick={() => setCount((value) => value + amount)}>+ Increment</Button>
      </Stack>
      <Button startIcon={<AutorenewRounded />} onClick={() => setCount(0)}>Reset counter</Button>
    </Stack>
  </ToolPanel>
}
