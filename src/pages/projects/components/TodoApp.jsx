import { useMemo, useState } from 'react'
import { AddRounded, CheckCircleRounded, CircleOutlined, DeleteOutlineRounded } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Checkbox, IconButton, InputAdornment, ListItem, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material'
import ProjectPanel from './ProjectPanel'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
]

export default function TodoApp() {
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState('')
  const [filter, setFilter] = useState('all')
  const completedCount = tasks.filter((task) => task.completed).length
  const activeCount = tasks.length - completedCount
  const filteredTasks = useMemo(() => tasks.filter((task) => (
    filter === 'all' || (filter === 'active' ? !task.completed : task.completed)
  )), [tasks, filter])

  const addTask = (event) => {
    event.preventDefault()
    const text = taskText.trim()
    if (!text) return
    setTasks((current) => [{ id: crypto.randomUUID(), text, completed: false }, ...current])
    setTaskText('')
  }

  const toggleTask = (id) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  return (
    <ProjectPanel maxWidth={900}>
      <Stack spacing={3}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' }, gap: 1.5 }}>
          {[
            { label: 'All tasks', value: tasks.length, color: '#4f46e5' },
            { label: 'Active', value: activeCount, color: '#e48a2b' },
            { label: 'Completed', value: completedCount, color: '#139a83' },
          ].map((stat) => (
            <Card key={stat.label} sx={{ border: '1px solid rgba(148,163,184,0.16)', boxShadow: 'none' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 800, color: stat.color }}>{stat.value}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box component="form" onSubmit={addTask}>
          <TextField
            fullWidth
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            placeholder="What needs to get done?"
            slotProps={{
              htmlInput: { 'aria-label': 'New task' },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button type="submit" variant="contained" startIcon={<AddRounded />} disabled={!taskText.trim()}>
                      Add task
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {filters.map((item) => (
            <Button key={item.id} variant={filter === item.id ? 'contained' : 'outlined'} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id}>
              {item.label}
            </Button>
          ))}
        </Stack>

        {filteredTasks.length === 0 ? (
          <Box sx={{ py: 5, textAlign: 'center', borderRadius: 3, bgcolor: 'action.hover' }}>
            <Typography sx={{ fontWeight: 700 }}>{tasks.length ? 'No tasks in this filter' : 'Nothing here just yet'}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Add a task above to get started.</Typography>
          </Box>
        ) : (
          <Stack spacing={1}>
            {filteredTasks.map((task) => (
              <Paper key={task.id} variant="outlined" sx={{ borderRadius: 3, borderColor: 'divider', '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.light' } }}>
                <ListItem
                  secondaryAction={
                    <IconButton aria-label={`Delete ${task.text}`} onClick={() => deleteTask(task.id)}>
                      <DeleteOutlineRounded />
                    </IconButton>
                  }
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    icon={<CircleOutlined />}
                    checkedIcon={<CheckCircleRounded />}
                    slotProps={{ input: { 'aria-label': `Mark ${task.text} ${task.completed ? 'active' : 'completed'}` } }}
                  />
                  <ListItemText primary={task.text} sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'text.secondary' : 'text.primary', pr: 5 }} />
                </ListItem>
              </Paper>
            ))}
          </Stack>
        )}
      </Stack>
    </ProjectPanel>
  )
}
