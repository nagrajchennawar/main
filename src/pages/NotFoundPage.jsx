import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Card sx={{ maxWidth: 560, mx: 'auto', mt: 8 }}>
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: '4rem', lineHeight: 1 }}>
            404
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Page not found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The page you requested could not be found.
          </Typography>
          <Button component={Link} to="/" variant="contained">
            Back to dashboard
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
