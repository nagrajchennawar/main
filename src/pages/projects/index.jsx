import {
  AccessTimeRounded,
  ArrowBackRounded,
  CheckCircleOutlineRounded,
  ColorLensRounded,
  ContentCopyRounded,
  FormatQuoteRounded,
  HourglassBottomRounded,
  NotesRounded,
  PasswordRounded,
  TextFieldsRounded,
  TimerRounded,
} from '@mui/icons-material'
import { Box, Button, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import CharacterCounter from './components/CharacterCounter'
import ColorPicker from './components/ColorPicker'
import CountdownTimer from './components/CountdownTimer'
import DigitalClock from './components/DigitalClock'
import NotesApp from './components/NotesApp'
import PasswordGenerator from './components/PasswordGenerator'
import Pomodoro from './components/Pomodoro'
import QuoteGenerator from './components/QuoteGenerator'
import Stopwatch from './components/Stopwatch'
import TodoApp from './components/TodoApp'

const projects = [
  { id: 'todo', title: 'To-Do List', description: 'Add, complete, delete, and filter your tasks.', category: 'Productivity', icon: CheckCircleOutlineRounded, color: '#4f46e5', tint: '#eeefff', tag: 'Stay on track' },
  { id: 'notes', title: 'Notes App', description: 'Create, edit, search, and organize quick notes.', category: 'Productivity', icon: NotesRounded, color: '#d97706', tint: '#fff5e8', tag: 'Capture ideas' },
  { id: 'password', title: 'Password Generator', description: 'Create a strong password with your chosen characters.', category: 'Utilities', icon: PasswordRounded, color: '#138a65', tint: '#e8faf5', tag: 'Secure passwords' },
  { id: 'clock', title: 'Digital Clock', description: 'See the live time and date in your preferred format.', category: 'Time', icon: AccessTimeRounded, color: '#2885cf', tint: '#eaf5ff', tag: '12 / 24 hour' },
  { id: 'stopwatch', title: 'Stopwatch', description: 'Track elapsed time, pause, reset, and record laps.', category: 'Time', icon: TimerRounded, color: '#d94f91', tint: '#fff0f6', tag: 'Track your time' },
  { id: 'countdown', title: 'Countdown Timer', description: 'Set a custom duration and count down to zero.', category: 'Time', icon: HourglassBottomRounded, color: '#7656d8', tint: '#f2edff', tag: 'Set a timer' },
  { id: 'pomodoro', title: 'Pomodoro Timer', description: 'Focus for 25 minutes, then take a 5-minute break.', category: 'Focus', icon: TimerRounded, color: '#dd6a48', tint: '#fff0eb', tag: 'Work · break' },
  { id: 'character-counter', title: 'Character Counter', description: 'Count characters, words, sentences, and remaining space.', category: 'Writing', icon: TextFieldsRounded, color: '#4b79d8', tint: '#edf2ff', tag: 'Text insights' },
  { id: 'color-picker', title: 'Color Picker', description: 'Choose a color and copy its HEX or RGB code.', category: 'Design', icon: ColorLensRounded, color: '#a24fc1', tint: '#f8edfc', tag: 'Pick a color' },
  { id: 'quotes', title: 'Random Quote Generator', description: 'Discover, copy, and share a new quote.', category: 'Inspiration', icon: FormatQuoteRounded, color: '#138f79', tint: '#e9f8f3', tag: 'A little inspiration' },
]

const projectViews = {
  todo: TodoApp,
  notes: NotesApp,
  password: PasswordGenerator,
  clock: DigitalClock,
  stopwatch: Stopwatch,
  countdown: CountdownTimer,
  pomodoro: Pomodoro,
  'character-counter': CharacterCounter,
  'color-picker': ColorPicker,
  quotes: QuoteGenerator,
}

export default function ProjectsPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const project = projects.find((item) => item.id === projectId)
  const Project = project ? projectViews[project.id] : null

  if (projectId && !project) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Project not found</Typography>
        <Button component={Link} to="/projects" variant="contained">Browse projects</Button>
      </Box>
    )
  }

  if (project && Project) {
    const Icon = project.icon
    return (
      <>
        <Button onClick={() => navigate('/projects')} startIcon={<ArrowBackRounded />} sx={{ mb: 2 }}>
          All projects
        </Button>
        <PageHeader
          title={project.title}
          subtitle={project.description}
          action={<Box sx={{ width: 48, height: 48, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: project.tint, color: project.color }}><Icon /></Box>}
        />
        <Project />
      </>
    )
  }

  return (
    <>
      <PageHeader title="Easy projects" subtitle="Choose a project to open it and start using it." />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' }, gap: 2.5 }}>
        {projects.map((item) => {
          const Icon = item.icon
          return (
            <Card
              key={item.id}
              sx={{
                overflow: 'hidden',
                border: '1px solid rgba(148,163,184,0.16)',
                transition: 'transform 180ms ease, box-shadow 180ms ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 18px 40px rgba(15,23,42,0.12)' },
              }}
            >
              <CardActionArea component={Link} to={`/projects/${item.id}`} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2.75, display: 'flex', flexDirection: 'column', minHeight: 205 }}>
                  <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2.25 }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: item.tint, color: item.color }}>
                      <Icon />
                    </Box>
                    <Chip size="small" label={item.category} sx={{ bgcolor: 'action.hover', color: 'text.secondary', fontWeight: 600 }} />
                  </Stack>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.75 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: 2 }}>{item.description}</Typography>
                  <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                    <Typography variant="caption" sx={{ color: item.color, fontWeight: 700 }}>{item.tag}</Typography>
                    <ContentCopyRounded sx={{ fontSize: 17, color: item.color, transform: 'rotate(-35deg)' }} />
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </Box>
    </>
  )
}
