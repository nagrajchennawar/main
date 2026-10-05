import { InputAdornment, TextField } from '@mui/material'

export const numberField = (label, value, onChange, props = {}) => (
  <TextField
    fullWidth
    label={label}
    type="number"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    inputProps={{ min: 0, ...props.inputProps }}
    InputProps={props.adornment ? { startAdornment: <InputAdornment position="start">{props.adornment}</InputAdornment> } : undefined}
  />
)

export function calculate(left, right, operator) {
  const result = operator === '+' ? left + right : operator === '-' ? left - right : operator === '×' ? left * right : right === 0 ? NaN : left / right
  return Number.isFinite(result) ? Number(result.toPrecision(10)) : 'Error'
}
