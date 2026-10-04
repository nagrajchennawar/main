import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { useAsyncResource } from '../hooks/useAsyncResource'
import { fetchDashboardData } from '../services/mockApi'

export default function DashboardPage() {
  const { data, loading, error } = useAsyncResource(fetchDashboardData)

  if (loading) {
    return (
      <>
        <PageHeader title="Dashboard" subtitle="Performance overview for the last 30 days" />
        <LoadingState message="Loading dashboard metrics…" />
      </>
    )
  }

  if (error) {
    return (
      <>
        <PageHeader title="Dashboard" subtitle="Performance overview for the last 30 days" />
        <ErrorState message={error} />
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Performance overview for the last 30 days"
        action={<Button variant="contained">Export report</Button>}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
          gap: 3,
        }}
      >
        {data.stats.map((stat) => (
          <Box key={stat.title}>
            <StatCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
              icon={stat.icon}
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.7fr 1fr' },
          gap: 3,
          mt: 1,
        }}
      >
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" sx={{ mb: 3, alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Team performance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Weekly progress vs. target
                </Typography>
              </Box>
              <Typography variant="body2" color="success.main" sx={{ fontWeight: 700 }}>
                +14.8% vs last week
              </Typography>
            </Stack>

            <List disablePadding>
              {data.activity.map((item) => (
                <ListItem key={item.label} disableGutters sx={{ display: 'block', mb: 2 }}>
                  <Stack direction="row" sx={{ mb: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.value}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={item.progress}
                    sx={{ height: 8, borderRadius: 999, backgroundColor: 'rgba(79,70,229,0.08)' }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Pipeline snapshot
            </Typography>

            <Stack spacing={2}>
              {data.pipeline.map((item) => (
                <Box key={item.name}>
                  <Stack direction="row" sx={{ mb: 0.75, justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.amount}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={item.progress}
                    sx={{ height: 8, borderRadius: 999, backgroundColor: 'rgba(15,23,42,0.08)' }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
