import {
  AddRounded,
  ArrowBackRounded,
  CalculateRounded,
  CakeRounded,
  CasinoRounded,
  CurrencyExchangeRounded,
  PercentRounded,
  RestaurantRounded,
  SportsEsportsRounded,
  SwapHorizRounded,
  TrendingUpRounded,
  MonitorWeightRounded,
} from '@mui/icons-material'
import { Box, Button, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import AgeCalculator from './components/AgeCalculator'
import BmiCalculator from './components/BmiCalculator'
import Counter from './components/Counter'
import CurrencyConverter from './components/CurrencyConverter'
import GuessingGame from './components/GuessingGame'
import MathCalculator from './components/MathCalculator'
import PercentageCalculator from './components/PercentageCalculator'
import RandomNumber from './components/RandomNumber'
import TipCalculator from './components/TipCalculator'
import UnitConverter from './components/UnitConverter'

const calculators = [
  { id: 'math', title: 'Math calculator', description: 'A clean, quick calculator for everyday maths.', category: 'Everyday', icon: CalculateRounded, color: '#5b5ce2', tint: '#eeefff', tag: 'Keyboard ready' },
  { id: 'age', title: 'Age calculator', description: 'Find your exact age down to the day.', category: 'Everyday', icon: CakeRounded, color: '#d94f91', tint: '#fff0f6', tag: 'Years · months · days' },
  { id: 'bmi', title: 'BMI calculator', description: 'Calculate your BMI and understand your range.', category: 'Health', icon: MonitorWeightRounded, color: '#139a83', tint: '#e8faf5', tag: 'Health snapshot' },
  { id: 'tip', title: 'Tip calculator', description: 'Split a bill and tip fairly with your group.', category: 'Everyday', icon: RestaurantRounded, color: '#e48a2b', tint: '#fff5e8', tag: 'Easy bill split' },
  { id: 'percentage', title: 'Percentage calculator', description: 'Work out percentages, changes, and marks.', category: 'Math', icon: PercentRounded, color: '#7656d8', tint: '#f2edff', tag: '3 useful tools' },
  { id: 'unit', title: 'Unit converter', description: 'Convert distance, weight, temperature, and volume.', category: 'Conversion', icon: SwapHorizRounded, color: '#2885cf', tint: '#eaf5ff', tag: '4 unit pairs' },
  { id: 'currency', title: 'Currency converter', description: 'Convert popular currencies with sample rates.', category: 'Conversion', icon: CurrencyExchangeRounded, color: '#138f79', tint: '#e9f8f3', tag: 'Sample rates' },
  { id: 'counter', title: 'Simple counter', description: 'Count up or down with a step that suits you.', category: 'Tools', icon: AddRounded, color: '#dd6a48', tint: '#fff0eb', tag: 'Custom step' },
  { id: 'random', title: 'Random number', description: 'Pick a random integer within your own range.', category: 'Tools', icon: CasinoRounded, color: '#a24fc1', tint: '#f8edfc', tag: 'Instant pick' },
  { id: 'guess', title: 'Number guessing game', description: 'Can you guess the secret number in fewer tries?', category: 'Games', icon: SportsEsportsRounded, color: '#4b79d8', tint: '#edf2ff', tag: 'Play a round' },
]

const toolViews = {
  math: MathCalculator,
  age: AgeCalculator,
  bmi: BmiCalculator,
  tip: TipCalculator,
  percentage: PercentageCalculator,
  unit: UnitConverter,
  currency: CurrencyConverter,
  counter: Counter,
  random: RandomNumber,
  guess: GuessingGame,
}

export default function CalculatorsPage() {
  const { calculatorId } = useParams()
  const navigate = useNavigate()
  const active = calculators.find((calculator) => calculator.id === calculatorId)
  const ActiveTool = active ? toolViews[active.id] : null

  if (calculatorId && !active) {
    return <Box sx={{ textAlign: 'center', py: 8 }}><Typography variant="h5" sx={{ mb: 2 }}>Calculator not found</Typography><Button component={Link} to="/calculators" variant="contained">Browse calculators</Button></Box>
  }

  if (active && ActiveTool) {
    const Icon = active.icon
    return <>
      <Button onClick={() => navigate('/calculators')} startIcon={<ArrowBackRounded />} sx={{ mb: 2 }}>All calculators</Button>
      <PageHeader title={active.title} subtitle={active.description} action={<Box sx={{ width: 48, height: 48, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: active.tint, color: active.color }}><Icon /></Box>} />
      <ActiveTool />
    </>
  }

  return <>
    <PageHeader title="Calculators" subtitle="A collection of handy tools for everyday numbers, conversions, and a little fun." />
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' }, gap: 2.5 }}>
      {calculators.map((calculator) => {
        const Icon = calculator.icon
        return <Card key={calculator.id} sx={{ overflow: 'hidden', border: '1px solid rgba(148,163,184,0.16)', transition: 'transform 180ms ease, box-shadow 180ms ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 18px 40px rgba(15,23,42,0.12)' } }}>
          <CardActionArea component={Link} to={`/calculators/${calculator.id}`} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.75, display: 'flex', flexDirection: 'column', minHeight: 218 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.25 }}>
                <Box sx={{ width: 50, height: 50, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: calculator.tint, color: calculator.color }}><Icon /></Box>
                <Chip size="small" label={calculator.category} sx={{ bgcolor: 'action.hover', color: 'text.secondary', fontWeight: 600 }} />
              </Stack>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.75 }}>{calculator.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: 2 }}>{calculator.description}</Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 'auto' }}>
                <Typography variant="caption" sx={{ color: calculator.color, fontWeight: 700 }}>{calculator.tag}</Typography>
                <TrendingUpRounded sx={{ fontSize: 18, color: calculator.color, transform: 'rotate(45deg)' }} />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      })}
    </Box>
  </>
}