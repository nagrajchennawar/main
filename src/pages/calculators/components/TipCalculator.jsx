import { useState } from 'react'
import { Box, Chip, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { ResultPanel, ToolPanel } from './CalculatorUi'
import { numberField } from './calculatorUtils.jsx'

export default function TipCalculator() {
  const [bill, setBill] = useState('')
  const [tip, setTip] = useState('15')
  const [people, setPeople] = useState('1')
  const split = Number(people) > 0 && Number(bill) >= 0 ? (Number(bill) * (1 + Number(tip) / 100)) / Number(people) : null
  return <ToolPanel subtitle="Add a bill, choose a tip, and split the total.">
    <Stack spacing={3}>
      {numberField('Bill amount', bill, setBill, { adornment: '$', inputProps: { min: 0, step: 'any' } })}
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1.25 }}>Tip percentage</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {['10', '15', '18', '20', 'Custom'].map((value) => <Chip key={value} label={value === 'Custom' ? value : `${value}%`} clickable color={tip === value ? 'primary' : 'default'} variant={tip === value ? 'filled' : 'outlined'} onClick={() => value !== 'Custom' && setTip(value)} />)}
        </Stack>
        <TextField fullWidth sx={{ mt: 2 }} label="Tip percentage" type="number" value={tip} onChange={(event) => setTip(event.target.value)} inputProps={{ min: 0, step: 'any' }} InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} />
      </Box>
      {numberField('Number of people', people, setPeople, { inputProps: { min: 1, step: 1 } })}
      {split !== null ? <ResultPanel label="Amount per person" value={`$${split.toFixed(2)}`} detail={`$${(Number(bill) * Number(tip) / 100).toFixed(2)} tip · ${people} ${Number(people) === 1 ? 'person' : 'people'}`} color="#e48a2b" /> : null}
    </Stack>
  </ToolPanel>
}
