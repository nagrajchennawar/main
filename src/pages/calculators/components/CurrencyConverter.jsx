import { useState } from 'react'
import { Alert, Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material'
import { ResultPanel, ToolPanel } from './CalculatorUi'
import { numberField } from './calculatorUtils.jsx'

const currencies = [
  { code: 'USD', name: 'US Dollar', rate: 1 },
  { code: 'INR', name: 'Indian Rupee', rate: 83.5 },
  { code: 'EUR', name: 'Euro', rate: 0.92 },
  { code: 'GBP', name: 'British Pound', rate: 0.79 },
  { code: 'CAD', name: 'Canadian Dollar', rate: 1.36 },
  { code: 'AUD', name: 'Australian Dollar', rate: 1.52 },
]

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const result = Number(amount) * currencies.find((item) => item.code === to).rate / currencies.find((item) => item.code === from).rate
  return <ToolPanel subtitle="Convert popular currencies. Rates are sample estimates and are not live.">
    <Stack spacing={3}>
      {numberField('Amount', amount, setAmount, { inputProps: { step: 'any' } })}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {[['From', from, setFrom], ['To', to, setTo]].map(([label, value, setter]) => <FormControl fullWidth key={label}><Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>{label}</Typography><Select value={value} onChange={(event) => setter(event.target.value)}>{currencies.map((currency) => <MenuItem key={currency.code} value={currency.code}>{currency.code} · {currency.name}</MenuItem>)}</Select></FormControl>)}
      </Box>
      <ResultPanel label={`${amount || 0} ${from} converts to`} value={`${result.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`} detail="Indicative result using sample rates" color="#138f79" />
      <Alert severity="warning">Sample rates only — connect a currency API for current exchange rates.</Alert>
    </Stack>
  </ToolPanel>
}
