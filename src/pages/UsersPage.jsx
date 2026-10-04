import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PageHeader from '../components/PageHeader'
import { useAsyncResource } from '../hooks/useAsyncResource'
import { fetchUsers } from '../services/mockApi'

export default function UsersPage() {
  const { data, loading, error } = useAsyncResource(fetchUsers)

  if (loading) {
    return (
      <>
        <PageHeader title="Users" subtitle="Team members and access roles" />
        <LoadingState message="Loading users…" />
      </>
    )
  }

  if (error) {
    return (
      <>
        <PageHeader title="Users" subtitle="Team members and access roles" />
        <ErrorState message={error} />
      </>
    )
  }

  if (!data.length) {
    return (
      <>
        <PageHeader title="Users" subtitle="Team members and access roles" />
        <EmptyState
          title="No users yet"
          description="Invite teammates to start collaborating and managing access."
          actionLabel="Add user"
        />
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Team members and access roles"
        action={<Button variant="contained">Invite user</Button>}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.team}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    size="small"
                    color={
                      user.status === 'Active'
                        ? 'success'
                        : user.status === 'Away'
                          ? 'warning'
                          : 'default'
                    }
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
