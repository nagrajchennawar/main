import { useMemo, useState } from 'react'
import { InputAdornment, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Stack, Typography } from '@mui/material'
import { SearchRounded } from '@mui/icons-material'
import ProjectPanel from '../../projects/components/ProjectPanel'

const people = [
  { name: 'Ava Patel', team: 'Design', status: 'Active' },
  { name: 'Noah Kim', team: 'Engineering', status: 'Active' },
  { name: 'Mia Garcia', team: 'Marketing', status: 'Away' },
  { name: 'Liam Chen', team: 'Engineering', status: 'Active' },
  { name: 'Isla Brown', team: 'Design', status: 'Away' },
  { name: 'Ethan Wilson', team: 'Marketing', status: 'Active' },
]

export default function SearchFilterTable() {
  const [query, setQuery] = useState('')
  const [team, setTeam] = useState('All teams')
  const [sort, setSort] = useState('name')
  const rows = useMemo(() => people.filter((person) => (team === 'All teams' || person.team === team) && `${person.name} ${person.team} ${person.status}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => a[sort].localeCompare(b[sort])), [query, team, sort])
  return <ProjectPanel maxWidth={950}>
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <TextField fullWidth placeholder="Search people" value={query} onChange={(e) => setQuery(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded /></InputAdornment> }} />
        <TextField select label="Team" value={team} onChange={(e) => setTeam(e.target.value)} sx={{ minWidth: 170 }}>{['All teams', 'Design', 'Engineering', 'Marketing'].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}</TextField>
        <TextField select label="Sort by" value={sort} onChange={(e) => setSort(e.target.value)} sx={{ minWidth: 150 }}><MenuItem value="name">Name</MenuItem><MenuItem value="team">Team</MenuItem><MenuItem value="status">Status</MenuItem></TextField>
      </Stack>
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead><TableRow sx={{ bgcolor: '#f8f9fc' }}><TableCell>Name</TableCell><TableCell>Team</TableCell><TableCell>Status</TableCell></TableRow></TableHead>
          <TableBody>{rows.map((person) => <TableRow key={person.name} hover><TableCell sx={{ fontWeight: 600 }}>{person.name}</TableCell><TableCell>{person.team}</TableCell><TableCell>{person.status}</TableCell></TableRow>)}</TableBody>
        </Table>
      </TableContainer>
      {!rows.length && <Typography align="center" color="text.secondary">No matching people found.</Typography>}
    </Stack>
  </ProjectPanel>
}
