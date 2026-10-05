import { useState } from 'react'
import { Box, Button, Stack } from '@mui/material'
import { ResultPanel, ToolPanel } from './CalculatorUi'
import { numberField } from './calculatorUtils.jsx'

export default function PercentageCalculator() {
  const [mode, setMode] = useState('of')
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const modes = [{ id: 'of', label: 'Find a percentage' }, { id: 'change', label: 'Percentage change' }, { id: 'marks', label: 'Marks percentage' }]
  const result = mode === 'of'
    ? Number(first) * Number(second) / 100
    : mode === 'change' && Number(first) !== 0 ? ((Number(second) - Number(first)) / Math.abs(Number(first))) * 100
      : mode === 'marks' && Number(second) > 0 ? (Number(first) / Number(second)) * 100 : null
  return <ToolPanel subtitle="Pick a calculation, then enter your numbers.">
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>{modes.map((item) => <Button key={item.id} variant={mode === item.id ? 'contained' : 'outlined'} onClick={() => { setMode(item.id); setFirst(''); setSecond('') }}>{item.label}</Button>)}</Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {numberField(mode === 'of' ? 'Percentage' : mode === 'change' ? 'Starting value' : 'Marks earned', first, setFirst, { inputProps: { step: 'any' } })}
        {numberField(mode === 'of' ? 'Number' : mode === 'change' ? 'New value' : 'Total marks', second, setSecond, { inputProps: { step: 'any' } })}
      </Box>
      {result !== null && Number.isFinite(result) ? <ResultPanel label={mode === 'of' ? `${first}% of ${second}` : mode === 'change' ? 'Percentage change' : 'Marks percentage'} value={`${result.toFixed(2)}%`} detail={mode === 'change' ? (result >= 0 ? 'Increase' : 'Decrease') : undefined} color="#7656d8" /> : null}
    </Stack>
  </ToolPanel>
}
