import { Alert, Box } from '@mui/material'

export default function ErrorState({ message = 'Something went wrong while loading this section.' }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Alert severity="error">{message}</Alert>
    </Box>
  )
}
