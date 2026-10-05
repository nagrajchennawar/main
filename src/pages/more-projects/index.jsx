import {
  AccountBalanceWalletRounded,
  ArrowBackRounded,
  AssessmentRounded,
  CollectionsRounded,
  DragIndicatorRounded,
  ExpandMoreRounded,
  FactCheckRounded,
  FilterAltRounded,
  HelpOutlineRounded,
  LoginRounded,
  QuizRounded,
  SearchRounded,
  ShoppingBagRounded,
  StyleRounded,
  TableChartRounded,
  ViewKanbanRounded,
} from '@mui/icons-material'
import { Box, Button, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import AuthUi from './components/AuthUi'
import DragDropList from './components/DragDropList'
import ExpenseTracker from './components/ExpenseTracker'
import FaqAccordion from './components/FaqAccordion'
import FlashcardApp from './components/FlashcardApp'
import FormValidation from './components/FormValidation'
import ImageGallery from './components/ImageGallery'
import KanbanBoard from './components/KanbanBoard'
import MultiStepForm from './components/MultiStepForm'
import PaginationDemo from './components/PaginationDemo'
import ProductFilter from './components/ProductFilter'
import QuizApp from './components/QuizApp'
import SearchFilterTable from './components/SearchFilterTable'
import ShoppingCart from './components/ShoppingCart'
import SimpleDashboard from './components/SimpleDashboard'

const projects = [
  { id: 'expense-tracker', title: 'Expense Tracker', description: 'Record expenses, group them by category, and see your total.', category: 'Finance', icon: AccountBalanceWalletRounded, color: '#138a65', tint: '#e8faf5', tag: 'Track spending' },
  { id: 'quiz', title: 'Quiz App', description: 'Answer questions, see instant feedback, and check your score.', category: 'Learning', icon: QuizRounded, color: '#7656d8', tint: '#f2edff', tag: 'Test your knowledge' },
  { id: 'flashcards', title: 'Flashcard App', description: 'Create question-and-answer cards and flip through a deck.', category: 'Learning', icon: StyleRounded, color: '#d97706', tint: '#fff5e8', tag: 'Study a topic' },
  { id: 'shopping-cart', title: 'Shopping Cart', description: 'Add and remove products and see the cart total update.', category: 'Shopping', icon: ShoppingBagRounded, color: '#d94f91', tint: '#fff0f6', tag: 'Add to cart' },
  { id: 'product-filter', title: 'Product Filter', description: 'Search, filter by category, and sort a product list.', category: 'Shopping', icon: FilterAltRounded, color: '#2885cf', tint: '#eaf5ff', tag: 'Find products' },
  { id: 'pagination', title: 'Pagination Component', description: 'Browse a sample list in pages with clear page controls.', category: 'Components', icon: MorePagesIcon, color: '#4b79d8', tint: '#edf2ff', tag: 'Page through data' },
  { id: 'search-table', title: 'Search + Filter Table', description: 'Search people, filter by team, and sort table results.', category: 'Components', icon: TableChartRounded, color: '#138f79', tint: '#e9f8f3', tag: 'Explore a table' },
  { id: 'login-register', title: 'Login / Register UI', description: 'Switch between polished login and registration forms.', category: 'Forms', icon: LoginRounded, color: '#5b5ce2', tint: '#eeefff', tag: 'Account forms' },
  { id: 'form-validation', title: 'Form Validation App', description: 'Try required fields, email checks, and matching passwords.', category: 'Forms', icon: FactCheckRounded, color: '#e48a2b', tint: '#fff5e8', tag: 'Validate input' },
  { id: 'image-gallery', title: 'Image Gallery', description: 'Browse a responsive gallery and open larger previews.', category: 'Media', icon: CollectionsRounded, color: '#a24fc1', tint: '#f8edfc', tag: 'Browse gallery' },
  { id: 'faq', title: 'FAQ Accordion', description: 'Expand answers in a clean, accessible FAQ list.', category: 'Components', icon: HelpOutlineRounded, color: '#dd6a48', tint: '#fff0eb', tag: 'Open answers' },
  { id: 'multi-step-form', title: 'Multi-Step Form', description: 'Move through a short form with a review step.', category: 'Forms', icon: ExpandMoreRounded, color: '#4f46e5', tint: '#eeefff', tag: 'Step by step' },
  { id: 'drag-drop', title: 'Drag & Drop List', description: 'Reorder a list by dragging items into position.', category: 'Components', icon: DragIndicatorRounded, color: '#139a83', tint: '#e8faf5', tag: 'Reorder items' },
  { id: 'kanban', title: 'Kanban Board', description: 'Organize tasks into To do, In progress, and Done.', category: 'Productivity', icon: ViewKanbanRounded, color: '#7656d8', tint: '#f2edff', tag: 'Move work forward' },
  { id: 'dashboard', title: 'Simple Dashboard', description: 'View sample metrics, activity, and project progress.', category: 'Analytics', icon: AssessmentRounded, color: '#2885cf', tint: '#eaf5ff', tag: 'See an overview' },
]

const projectViews = {
  'expense-tracker': ExpenseTracker,
  quiz: QuizApp,
  flashcards: FlashcardApp,
  'shopping-cart': ShoppingCart,
  'product-filter': ProductFilter,
  pagination: PaginationDemo,
  'search-table': SearchFilterTable,
  'login-register': AuthUi,
  'form-validation': FormValidation,
  'image-gallery': ImageGallery,
  faq: FaqAccordion,
  'multi-step-form': MultiStepForm,
  'drag-drop': DragDropList,
  kanban: KanbanBoard,
  dashboard: SimpleDashboard,
}

function MorePagesIcon(props) {
  return <SearchRounded {...props} />
}

export default function MoreProjectsPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const project = projects.find((item) => item.id === projectId)
  const Project = project ? projectViews[project.id] : null

  if (projectId && !project) {
    return <Box sx={{ textAlign: 'center', py: 8 }}><Typography variant="h5" sx={{ mb: 2 }}>Project not found</Typography><Button component={Link} to="/more-projects" variant="contained">Browse projects</Button></Box>
  }

  if (project && Project) {
    const Icon = project.icon
    return <>
      <Button onClick={() => navigate('/more-projects')} startIcon={<ArrowBackRounded />} sx={{ mb: 2 }}>All projects</Button>
      <PageHeader title={project.title} subtitle={project.description} action={<Box sx={{ width: 48, height: 48, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: project.tint, color: project.color }}><Icon /></Box>} />
      <Project />
    </>
  }

  return <>
    <PageHeader title="Mini projects" subtitle="Explore interactive demos, components, and small productivity apps." />
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' }, gap: 2.5 }}>
      {projects.map((item) => {
        const Icon = item.icon
        return <Card key={item.id} sx={{ overflow: 'hidden', border: '1px solid rgba(148,163,184,0.16)', transition: 'transform 180ms ease, box-shadow 180ms ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 18px 40px rgba(15,23,42,0.12)' } }}>
          <CardActionArea component={Link} to={`/more-projects/${item.id}`} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.75, display: 'flex', flexDirection: 'column', minHeight: 205 }}>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2.25 }}>
                <Box sx={{ width: 50, height: 50, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: item.tint, color: item.color }}><Icon /></Box>
                <Chip size="small" label={item.category} sx={{ bgcolor: '#f5f6fa', fontWeight: 600 }} />
              </Stack>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.75 }}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: 2 }}>{item.description}</Typography>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                <Typography variant="caption" sx={{ color: item.color, fontWeight: 700 }}>{item.tag}</Typography>
                <Icon sx={{ fontSize: 18, opacity: 0.7 }} />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      })}
    </Box>
  </>
}
