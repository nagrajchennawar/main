import {
  ArrowDownwardRounded,
  ArrowUpwardRounded,
  AttachMoneyRounded,
  ChecklistRounded,
  PeopleAltRounded,
  TrendingUpRounded,
} from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'

const ICON_MAP = {
  AttachMoney: AttachMoneyRounded,
  People: PeopleAltRounded,
  TrendingUp: TrendingUpRounded,
  Checklist: ChecklistRounded,
}

export default function StatCard({ title, value, change, trend, icon }) {
  const Icon = ICON_MAP[icon] || TrendingUpRounded
  const isPositive = trend === 'up'

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 2,
              backgroundColor: (theme) => `${theme.palette.primary.main}14`,
              color: 'primary.main',
            }}
          >
            <Icon fontSize="small" />
          </Box>
        </Stack>

        <Chip
          icon={isPositive ? <ArrowUpwardRounded fontSize="small" /> : <ArrowDownwardRounded fontSize="small" />}
          label={change}
          color={isPositive ? 'success' : 'default'}
          size="small"
          sx={{ mt: 2, fontWeight: 600 }}
        />
      </CardContent>
    </Card>
  )
}
