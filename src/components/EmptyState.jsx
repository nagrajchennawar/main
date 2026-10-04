import { Button, Paper, Stack, Typography } from '@mui/material'

export default function EmptyState({
  title = 'No data available',
  description = 'There is nothing to show yet.',
  actionLabel = 'Create item',
  onAction,
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 4,
        textAlign: 'center',
        borderRadius: 3,
        borderStyle: 'dashed',
      }}
    >
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        {onAction ? (
          <Button variant="contained" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </Stack>
    </Paper>
  )
}
