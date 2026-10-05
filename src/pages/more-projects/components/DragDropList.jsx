import { useState } from 'react'
import { DragIndicatorRounded } from '@mui/icons-material'
import { List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material'
import ProjectPanel from '../../projects/components/ProjectPanel'

const initialItems = ['Plan the week', 'Review project notes', 'Send the update', 'Take a short break']

export default function DragDropList() {
  const [items, setItems] = useState(initialItems)
  const [dragging, setDragging] = useState(null)
  const reorder = (target) => {
    if (dragging === null || dragging === target) return
    setItems((current) => {
      const next = [...current]
      const [moved] = next.splice(dragging, 1)
      next.splice(target, 0, moved)
      return next
    })
    setDragging(null)
  }
  return <ProjectPanel>
    <Stack spacing={2}>
      <Typography color="text.secondary">Drag items to change their order.</Typography>
      <List sx={{ p: 0 }}>{items.map((item, index) => (
        <Paper key={item} variant="outlined" draggable onDragStart={() => setDragging(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => reorder(index)} onDragEnd={() => setDragging(null)} sx={{ mb: 1, borderRadius: 3, cursor: 'grab', bgcolor: 'background.paper', color: 'text.primary', opacity: dragging === index ? 0.45 : 1, '&:hover': { bgcolor: 'action.hover' } }}>
          <ListItem><ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}><DragIndicatorRounded /></ListItemIcon><ListItemText primary={item} /></ListItem>
        </Paper>
      ))}</List>
    </Stack>
  </ProjectPanel>
}
