import { useState } from 'react'
import { Box, Button, Card, CardContent, Chip, LinearProgress, Stack, Typography } from '@mui/material'
import ProjectPanel from '../../projects/components/ProjectPanel'

const stats = [
  { label: 'Revenue', value: '$24,580', change: '+12.8%', color: '#4f46e5', progress: 76 },
  { label: 'Orders', value: '1,284', change: '+8.2%', color: '#138a65', progress: 62 },
  { label: 'Customers', value: '846', change: '+5.4%', color: '#d97706', progress: 48 },
]
const activity = [
  { label: 'Website redesign', progress: 78 },
  { label: 'Mobile experience', progress: 54 },
  { label: 'Help center refresh', progress: 91 },
]

export default function SimpleDashboard() {
  const [period, setPeriod] = useState('This month')
  return <ProjectPanel maxWidth={1050}>
    <Stack spacing={2.5}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}><Typography variant="h6" sx={{ fontWeight: 800 }}>Overview</Typography><Stack direction="row" spacing={1}><Button size="small" variant={period === 'This week' ? 'contained' : 'outlined'} onClick={() => setPeriod('This week')}>This week</Button><Button size="small" variant={period === 'This month' ? 'contained' : 'outlined'} onClick={() => setPeriod('This month')}>This month</Button></Stack></Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' }, gap: 1.5 }}>{stats.map((stat) => <Card key={stat.label} sx={{ border: '1px solid #edf0f5', boxShadow: 'none' }}><CardContent><Typography variant="body2" color="text.secondary">{stat.label}</Typography><Typography variant="h5" sx={{ my: 1, fontWeight: 800 }}>{stat.value}</Typography><Chip size="small" label={stat.change} color="success" /></CardContent></Card>)}</Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 2 }}>
        <Box sx={{ p: 2.5, borderRadius: 3, bgcolor: '#f8f9fc' }}><Typography sx={{ fontWeight: 800, mb: 2 }}>Weekly activity · {period}</Typography><Stack direction="row" spacing={1} sx={{ height: 180, alignItems: 'flex-end', justifyContent: 'space-around' }}>{[42, 68, 53, 88, 62, 96, 74].map((height, index) => <Stack key={index} spacing={1} sx={{ alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}><Box sx={{ width: '70%', maxWidth: 42, height: `${height}%`, borderRadius: '8px 8px 2px 2px', bgcolor: index === 5 ? '#4f46e5' : '#c7c9f7' }} /><Typography variant="caption" color="text.secondary">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</Typography></Stack>)}</Stack></Box>
        <Box sx={{ p: 2.5, borderRadius: 3, bgcolor: '#f8f9fc' }}><Typography sx={{ fontWeight: 800, mb: 2 }}>Project progress</Typography><Stack spacing={2}>{activity.map((item) => <Box key={item.label}><Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.75 }}><Typography variant="body2">{item.label}</Typography><Typography variant="caption" color="text.secondary">{item.progress}%</Typography></Stack><LinearProgress variant="determinate" value={item.progress} sx={{ height: 8, borderRadius: 5 }} /></Box>)}</Stack></Box>
      </Box>
    </Stack>
  </ProjectPanel>
}
