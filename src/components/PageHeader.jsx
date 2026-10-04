import { Box, Stack, Typography } from '@mui/material'

export default function PageHeader({ title, subtitle, action }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{
        mb: 3,
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: subtitle ? 0.5 : 0 }}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      {action ? <Box>{action}</Box> : null}
    </Stack>
  )
}
