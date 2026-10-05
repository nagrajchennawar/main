import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ToolPanel } from './CalculatorUi'
import { calculate } from './calculatorUtils.jsx'

export default function MathCalculator() {
  const [display, setDisplay] = useState('0')
  const [stored, setStored] = useState(null)
  const [operator, setOperator] = useState(null)
  const [fresh, setFresh] = useState(false)
  const [expression, setExpression] = useState('')

  const clear = () => {
    setDisplay('0')
    setStored(null)
    setOperator(null)
    setFresh(false)
    setExpression('')
  }
  const input = (value) => setDisplay((current) => {
    if (value === '.') return current.includes('.') && !fresh ? current : fresh ? '0.' : `${current}.`
    return fresh || current === '0' ? value : `${current}${value}`
  })
  const chooseOperator = (nextOperator) => {
    const current = Number(display)
    if (operator && !fresh && stored !== null) {
      const result = calculate(stored, current, operator)
      setDisplay(String(result))
      setStored(result)
    } else setStored(current)
    setOperator(nextOperator)
    setExpression(`${display} ${nextOperator}`)
    setFresh(true)
  }
  const equals = () => {
    if (!operator || stored === null) return
    const result = calculate(stored, Number(display), operator)
    setExpression(`${stored} ${operator} ${display} =`)
    setDisplay(String(result))
    setStored(null)
    setOperator(null)
    setFresh(true)
  }
  const press = (key) => {
    if (/^\d$/.test(key) || key === '.') input(key)
    else if (['+', '-', '*', '/'].includes(key)) chooseOperator(key === '*' ? '×' : key === '/' ? '÷' : key)
    else if (key === 'Enter' || key === '=') equals()
    else if (key === 'Escape') clear()
    else if (key === 'Backspace') setDisplay((value) => value.length > 1 ? value.slice(0, -1) : '0')
  }
  useEffect(() => {
    const handleKey = (event) => {
      if (/^\d$/.test(event.key) || ['.', '+', '-', '*', '/', 'Enter', '=', 'Escape', 'Backspace'].includes(event.key)) {
        event.preventDefault()
        press(event.key)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const keys = ['AC', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=']
  return (
    <ToolPanel title={null}>
      <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderRadius: 4, bgcolor: '#11142a', color: 'white', mb: 2.5, minHeight: 145, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'right' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', minHeight: 22 }}>{expression || 'Ready when you are'}</Typography>
        <Typography aria-live="polite" sx={{ fontSize: { xs: 40, sm: 52 }, fontWeight: 700, letterSpacing: '-0.05em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{display}</Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 1.25 }}>
        {keys.map((key) => {
          const special = ['÷', '×', '-', '+', '='].includes(key)
          return <Button key={key} variant={special ? 'contained' : 'outlined'} onClick={() => {
            if (key === 'AC') clear()
            else if (key === '±') setDisplay(String(Number(display) * -1))
            else if (key === '%') setDisplay(String(Number(display) / 100))
            else press(key)
          }} sx={{ minHeight: { xs: 54, sm: 64 }, fontSize: 20, gridColumn: key === '0' ? 'span 2' : undefined, bgcolor: special ? '#5b5ce2' : '#f8f9fc', color: special ? 'white' : '#182033', borderColor: '#e8eaf2', '&:hover': { bgcolor: special ? '#4b4cc8' : '#edf0f7' } }}>{key}</Button>
        })}
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>Keyboard: numbers and operators · Enter to calculate · Esc to clear</Typography>
    </ToolPanel>
  )
}
