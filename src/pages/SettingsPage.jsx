import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PageHeader from '../components/PageHeader'
import { useAsyncResource } from '../hooks/useAsyncResource'
import { fetchSettings } from '../services/mockApi'

export default function SettingsPage() {
  const { data, loading, error } = useAsyncResource(fetchSettings)

  if (loading) {
    return (
      <>
        <PageHeader title="Settings" subtitle="Manage workspace preferences and automation" />
        <LoadingState message="Loading settings…" />
      </>
    )
  }

  if (error) {
    return (
      <>
        <PageHeader title="Settings" subtitle="Manage workspace preferences and automation" />
        <ErrorState message={error} />
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage workspace preferences and automation"
        action={<Button variant="contained">Save changes</Button>}
      />

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Preferences
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                Your preferences sync across devices every 15 minutes.
              </Alert>
            </Box>

            <FormGroup>
              <FormControlLabel
                control={<Switch defaultChecked={data.notifications} />}
                label="Email notifications"
              />
              <FormControlLabel
                control={<Switch defaultChecked={data.weeklyDigest} />}
                label="Weekly digest"
              />
              <FormControlLabel
                control={<Switch defaultChecked={data.marketingEmails} />}
                label="Marketing emails"
              />
              <FormControlLabel
                control={<Switch defaultChecked={data.twoFactor} />}
                label="Two-factor authentication"
              />
              <FormControlLabel
                control={<Switch defaultChecked={data.autoSave} />}
                label="Auto-save drafts"
              />
              <FormControlLabel
                control={<Switch defaultChecked={data.compactLayout} />}
                label="Compact layout"
              />
            </FormGroup>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
