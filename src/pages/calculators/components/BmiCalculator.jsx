import { useState } from 'react'
import { Alert, Box, Stack } from '@mui/material'
import { ResultPanel, ToolPanel } from './CalculatorUi'
import { numberField } from './calculatorUtils.jsx'

export default function BmiCalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const bmi = Number(height) > 0 && Number(weight) > 0 ? Number(weight) / ((Number(height) / 100) ** 2) : null
  const category = bmi === null ? '' : bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obesity'
  return <ToolPanel subtitle="Enter your height and weight for a quick BMI estimate.">
    <Stack spacing={3}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {numberField('Height (cm)', height, setHeight, { inputProps: { min: 1, step: 'any' } })}
        {numberField('Weight (kg)', weight, setWeight, { inputProps: { min: 1, step: 'any' } })}
      </Box>
      {bmi !== null ? <ResultPanel label="Your BMI" value={bmi.toFixed(1)} detail={category} color="#139a83" /> : null}
      <Alert severity="info">BMI is a general screening measure, not a medical diagnosis.</Alert>
    </Stack>
  </ToolPanel>
}
