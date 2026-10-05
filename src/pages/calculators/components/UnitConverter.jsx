import { useState } from 'react'
import { AutorenewRounded } from '@mui/icons-material'
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField } from '@mui/material'
import { ResultPanel, ToolPanel } from './CalculatorUi'

const unitOptions = {
  distance: [{ label: 'Kilometers', symbol: 'km' }, { label: 'Miles', symbol: 'mi' }],
  weight: [{ label: 'Kilograms', symbol: 'kg' }, { label: 'Pounds', symbol: 'lb' }],
  temperature: [{ label: 'Celsius', symbol: '°C' }, { label: 'Fahrenheit', symbol: '°F' }],
  volume: [{ label: 'Liters', symbol: 'L' }, { label: 'US gallons', symbol: 'gal' }],
}

export default function UnitConverter() {
  const [kind, setKind] = useState('distance')
  const [amount, setAmount] = useState('1')
  const [from, setFrom] = useState(0)
  const units = unitOptions[kind]
  const convert = () => {
    const value = Number(amount)
    if (kind === 'distance') return from === 0 ? value * 0.621371 : value / 0.621371
    if (kind === 'weight') return from === 0 ? value * 2.20462 : value / 2.20462
    if (kind === 'temperature') return from === 0 ? value * 9 / 5 + 32 : (value - 32) * 5 / 9
    return from === 0 ? value * 0.264172 : value / 0.264172
  }
  return <ToolPanel subtitle="Choose a measurement and enter the value to convert.">
    <Stack spacing={3}>
      <FormControl fullWidth><Select value={kind} onChange={(event) => { setKind(event.target.value); setFrom(0) }}>{Object.entries(unitOptions).map(([value, options]) => <MenuItem key={value} value={value}>{options[0].label} ↔ {options[1].label}</MenuItem>)}</Select></FormControl>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <TextField fullWidth label="Value" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} inputProps={{ step: 'any' }} />
        <FormControl fullWidth><Select value={from} onChange={(event) => setFrom(Number(event.target.value))}><MenuItem value={0}>{units[0].label} ({units[0].symbol})</MenuItem><MenuItem value={1}>{units[1].label} ({units[1].symbol})</MenuItem></Select></FormControl>
      </Box>
      {amount !== '' && Number.isFinite(convert()) ? <ResultPanel label={`${amount} ${units[from].symbol} equals`} value={`${Number(convert().toFixed(6))} ${units[1 - from].symbol}`} detail={`Converted to ${units[1 - from].label}`} color="#2885cf" /> : null}
      <Button variant="outlined" startIcon={<AutorenewRounded />} onClick={() => setFrom(1 - from)}>Swap units</Button>
    </Stack>
  </ToolPanel>
}
