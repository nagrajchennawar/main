import { Box, Card, CardContent } from '@mui/material'

export default function ProjectPanel({ children, maxWidth = 820 }) {
  return (
    <Card sx={{ maxWidth, mx: 'auto', border: '1px solid rgba(148,163,184,0.18)' }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Box>{children}</Box>
      </CardContent>
    </Card>
  )
}
