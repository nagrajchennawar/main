import { useState } from 'react'
import { CasinoRounded } from '@mui/icons-material'
import { Alert, Box, Button, Stack, Typography } from '@mui/material'
import { ResultPanel, ToolPanel } from './CalculatorUi'
import { numberField } from './calculatorUtils.jsx'

export default function RandomNumber() {
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [result, setResult] = useState(null)
  const valid = Number.isInteger(Number(min)) && Number.isInteger(Number(max)) && Number(min) <= Number(max)
  return <ToolPanel subtitle="Set an inclusive range and let chance choose a number.">
    <Stack spacing={3}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>{numberField('Minimum', min, setMin, { inputProps: { step: 1 } })}{numberField('Maximum', max, setMax, { inputProps: { step: 1 } })}</Box>
      {result !== null ? <ResultPanel label="Your random number" value={result} detail={`Picked between ${min} and ${max}`} color="#a24fc1" /> : <Box sx={{ py: 2, textAlign: 'center' }}><CasinoRounded sx={{ fontSize: 58, color: '#a24fc1' }} /><Typography color="text.secondary">Your lucky number will show up here.</Typography></Box>}
      {!valid ? <Alert severity="error">Enter whole numbers with a minimum no greater than the maximum.</Alert> : null}
      <Button variant="contained" size="large" disabled={!valid} startIcon={<CasinoRounded />} onClick={() => setResult(Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min))}>Generate number</Button>
    </Stack>
  </ToolPanel>
}
