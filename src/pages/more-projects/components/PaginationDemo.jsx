import { useMemo, useState } from 'react'
import { Pagination, Stack, Typography } from '@mui/material'
import ProjectPanel from '../../projects/components/ProjectPanel'

const rows = Array.from({ length: 47 }, (_, index) => `Sample record ${String(index + 1).padStart(2, '0')}`)
const PER_PAGE = 6

export default function PaginationDemo() {
  const [page, setPage] = useState(1)
  const pageCount = Math.ceil(rows.length / PER_PAGE)
  const visible = useMemo(() => rows.slice((page - 1) * PER_PAGE, page * PER_PAGE), [page])
  return <ProjectPanel>
    <Stack spacing={2.5} alignItems="center">
      <Typography color="text.secondary">Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, rows.length)} of {rows.length} records</Typography>
      <Stack spacing={1} sx={{ width: '100%' }}>{visible.map((row) => <Typography key={row} sx={{ p: 1.75, borderRadius: 2, bgcolor: '#f8f9fc' }}>{row}</Typography>)}</Stack>
      <Pagination count={pageCount} page={page} onChange={(_, value) => setPage(value)} color="primary" shape="rounded" />
    </Stack>
  </ProjectPanel>
}
