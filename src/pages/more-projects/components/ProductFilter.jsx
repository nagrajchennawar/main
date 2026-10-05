import { useMemo, useState } from 'react'
import { Chip, FormControl, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { SearchRounded } from '@mui/icons-material'
import ProjectPanel from '../../projects/components/ProjectPanel'

const products = [
  { name: 'Everyday Backpack', category: 'Bags', price: 64 },
  { name: 'City Sling', category: 'Bags', price: 38 },
  { name: 'Classic Tee', category: 'Clothing', price: 28 },
  { name: 'Soft Hoodie', category: 'Clothing', price: 58 },
  { name: 'Travel Bottle', category: 'Accessories', price: 24 },
  { name: 'Cotton Cap', category: 'Accessories', price: 19 },
]

export default function ProductFilter() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const filtered = useMemo(() => products.filter((p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : a.name.localeCompare(b.name)), [category, query, sort])
  return <ProjectPanel>
    <Stack spacing={2.5}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <TextField fullWidth placeholder="Search products" value={query} onChange={(e) => setQuery(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded /></InputAdornment> }} />
        <FormControl sx={{ minWidth: 150 }}><Select value={category} onChange={(e) => setCategory(e.target.value)}>{['All', 'Bags', 'Clothing', 'Accessories'].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}</Select></FormControl>
        <FormControl sx={{ minWidth: 170 }}><Select value={sort} onChange={(e) => setSort(e.target.value)}><MenuItem value="featured">Sort by name</MenuItem><MenuItem value="low">Price: low to high</MenuItem><MenuItem value="high">Price: high to low</MenuItem></Select></FormControl>
      </Stack>
      <Typography variant="body2" color="text.secondary">{filtered.length} products</Typography>
      <Stack spacing={1}>{filtered.map((p) => <Stack key={p.name} direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', p: 1.5, borderRadius: 2, bgcolor: '#f8f9fc' }}><Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}><Typography sx={{ fontWeight: 700 }}>{p.name}</Typography><Chip size="small" label={p.category} /></Stack><Typography sx={{ fontWeight: 700 }}>${p.price.toFixed(2)}</Typography></Stack>)}</Stack>
      {filtered.length === 0 && <Typography align="center" color="text.secondary">No products match these filters.</Typography>}
    </Stack>
  </ProjectPanel>
}
