import { useState } from 'react'
import { AddRounded, DeleteOutlineRounded } from '@mui/icons-material'
import { Box, Button, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material'
import ProjectPanel from '../../projects/components/ProjectPanel'

const columns = [
  { id: 'todo', label: 'To do', color: '#64748b' },
  { id: 'progress', label: 'In progress', color: '#4f46e5' },
  { id: 'done', label: 'Done', color: '#138a65' },
]

export default function KanbanBoard() {
  const [cards, setCards] = useState([
    { id: 'a', title: 'Sketch project flow', status: 'todo' },
    { id: 'b', title: 'Build the first draft', status: 'progress' },
    { id: 'c', title: 'Set up workspace', status: 'done' },
  ])
  const [title, setTitle] = useState('')
  const add = (event) => {
    event.preventDefault()
    if (!title.trim()) return
    setCards((current) => [...current, { id: crypto.randomUUID(), title: title.trim(), status: 'todo' }])
    setTitle('')
  }
  return <ProjectPanel maxWidth={1050}>
    <Stack spacing={2.5}>
      <Box component="form" onSubmit={add} sx={{ display: 'flex', gap: 1 }}><TextField fullWidth size="small" label="New board task" value={title} onChange={(e) => setTitle(e.target.value)} /><Button type="submit" variant="contained" startIcon={<AddRounded />}>Add</Button></Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 2, alignItems: 'start' }}>
        {columns.map((column) => <Box key={column.id} sx={{ p: 1.5, minHeight: 260, borderRadius: 3, bgcolor: 'action.hover', color: 'text.primary' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}><Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: column.color }} /><Typography sx={{ fontWeight: 800 }}>{column.label}</Typography><Typography variant="caption" color="text.secondary">({cards.filter((card) => card.status === column.id).length})</Typography></Stack>
          <Stack spacing={1}>{cards.filter((card) => card.status === column.id).map((card) => <Box key={card.id} sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.paper', color: 'text.primary', border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 8px rgba(15,23,42,.05)' }}><Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}><Typography sx={{ flex: 1, fontWeight: 600, overflowWrap: 'anywhere' }}>{card.title}</Typography><IconButton size="small" aria-label={`Delete ${card.title}`} onClick={() => setCards((current) => current.filter((item) => item.id !== card.id))}><DeleteOutlineRounded fontSize="small" /></IconButton></Stack><TextField select fullWidth size="small" label="Move to" value={card.status} onChange={(event) => setCards((current) => current.map((item) => item.id === card.id ? { ...item, status: event.target.value } : item))} sx={{ mt: 1 }}>{columns.map((option) => <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>)}</TextField></Box>)}</Stack>
        </Box>)}
      </Box>
    </Stack>
  </ProjectPanel>
}
