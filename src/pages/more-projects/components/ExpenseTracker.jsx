import { useState } from 'react'
import { Box, Button, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { DeleteOutlineRounded } from '@mui/icons-material'
import ProjectPanel from '../../projects/components/ProjectPanel'

export default function ExpenseTracker() {
  const [items, setItems] = useState([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Other')
  const total = items.reduce((sum, item) => sum + item.amount, 0)
  const add = (event) => {
    event.preventDefault()
    const value = Number(amount)
    if (!description.trim() || !Number.isFinite(value) || value <= 0) return
    setItems((current) => [{ id: crypto.randomUUID(), description: description.trim(), amount: value, category }, ...current])
    setDescription('')
    setAmount('')
  }

  return <ProjectPanel>
    <Stack spacing={2.5}>
      <Box sx={{ p: 2.5, bgcolor: '#eff7f3', borderRadius: 3 }}>
        <Typography variant="body2" color="text.secondary">Total expenses</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#138a65' }}>${total.toFixed(2)}</Typography>
      </Box>
      <Box component="form" onSubmit={add} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr auto' }, gap: 1.5 }}>
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <TextField label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} inputProps={{ min: 0.01, step: '0.01' }} required />
        <TextField select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>{['Other', 'Food', 'Transport', 'Home', 'Entertainment'].map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}</TextField>
        <Button type="submit" variant="contained">Add</Button>
      </Box>
      <Stack spacing={1}>
        {items.length === 0 ? <Typography color="text.secondary" align="center" sx={{ py: 3 }}>Add your first expense to get started.</Typography> : items.map((item) => (
          <Stack key={item.id} direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', p: 1.5, borderRadius: 2, bgcolor: '#f8f9fc' }}>
            <Box><Typography sx={{ fontWeight: 700 }}>{item.description}</Typography><Typography variant="caption" color="text.secondary">{item.category}</Typography></Box>
            <Stack direction="row" sx={{ alignItems: 'center' }}><Typography sx={{ fontWeight: 700 }}>${item.amount.toFixed(2)}</Typography><IconButton aria-label={`Delete ${item.description}`} onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}><DeleteOutlineRounded /></IconButton></Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  </ProjectPanel>
}
