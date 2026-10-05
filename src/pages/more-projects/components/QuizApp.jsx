import { useState } from 'react'
import { Alert, Button, Chip, Stack, Typography } from '@mui/material'
import ProjectPanel from '../../projects/components/ProjectPanel'

const questions = [
  { question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Mercury'], answer: 'Mars' },
  { question: 'How many sides does a hexagon have?', options: ['Five', 'Six', 'Seven', 'Eight'], answer: 'Six' },
  { question: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 'Pacific' },
  { question: 'Which gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], answer: 'Carbon dioxide' },
]

export default function QuizApp() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [checked, setChecked] = useState(false)
  const choose = (option) => { if (!checked) setSelected(option) }
  const submit = () => {
    if (!selected || checked) return
    if (selected === questions[index].answer) setScore((value) => value + 1)
    setChecked(true)
  }
  const next = () => {
    if (index === questions.length - 1) setFinished(true)
    else { setIndex((value) => value + 1); setSelected(''); setChecked(false) }
  }
  const restart = () => { setIndex(0); setSelected(''); setScore(0); setFinished(false); setChecked(false) }
  return <ProjectPanel>
    {finished ? <Stack spacing={2} alignItems="center"><Typography variant="h5" sx={{ fontWeight: 800 }}>Quiz complete!</Typography><Typography>Your score: {score} / {questions.length}</Typography><Button variant="contained" onClick={restart}>Play again</Button></Stack> : (
      <Stack spacing={2.5}>
        <Chip label={`Question ${index + 1} of ${questions.length}`} sx={{ alignSelf: 'flex-start' }} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>{questions[index].question}</Typography>
        <Stack spacing={1}>{questions[index].options.map((option) => <Button key={option} variant={selected === option ? 'contained' : 'outlined'} onClick={() => choose(option)} sx={{ justifyContent: 'flex-start' }}>{option}</Button>)}</Stack>
        {checked && <Alert severity={selected === questions[index].answer ? 'success' : 'error'}>{selected === questions[index].answer ? 'Correct!' : `Not quite — the answer is ${questions[index].answer}.`}</Alert>}
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}><Typography color="text.secondary">Score: {score}</Typography>{checked ? <Button variant="contained" onClick={next}>{index === questions.length - 1 ? 'See score' : 'Next question'}</Button> : <Button variant="contained" onClick={submit} disabled={!selected}>Check answer</Button>}</Stack>
      </Stack>
    )}
  </ProjectPanel>
}
