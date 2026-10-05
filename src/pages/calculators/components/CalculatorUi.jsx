import { Box, Card, CardContent, Typography } from '@mui/material'

export function ResultPanel({ label, value, detail, color = '#4f46e5' }) {
  return (
    <Box sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: 4, color: 'white', background: `linear-gradient(135deg, ${color}, ${color}cc)`, minHeight: 130, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="body2" sx={{ opacity: 0.82 }}>{label}</Typography>
      <Typography sx={{ fontSize: { xs: 30, sm: 38 }, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.2, overflowWrap: 'anywhere' }}>{value}</Typography>
      {detail ? <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.82 }}>{detail}</Typography> : null}
    </Box>
  )
}

export function ToolPanel({ children, title = 'Enter your details', subtitle }) {
  return (
    <Card sx={{ maxWidth: 850, mx: 'auto', border: '1px solid rgba(148,163,184,0.16)' }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        {title ? <Box sx={{ mb: 3 }}><Typography variant="h6" sx={{ fontWeight: 800 }}>{title}</Typography>{subtitle ? <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{subtitle}</Typography> : null}</Box> : null}
        {children}
      </CardContent>
    </Card>
  )
}
