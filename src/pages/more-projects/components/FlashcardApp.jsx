import { useState } from 'react'
import { AddRounded, DeleteOutlineRounded, FlipRounded } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import ProjectPanel from '../../projects/components/ProjectPanel'

export default function FlashcardApp() {
  const [cards, setCards] = useState([])
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const add = (event) => {
    event.preventDefault()
    if (!front.trim() || !back.trim()) return
    setCards((items) => [...items, { id: crypto.randomUUID(), front: front.trim(), back: back.trim() }])
    setFront('')
    setBack('')
  }
  const current = cards[index]
  const move = (offset) => { setIndex((value) => (value + offset + cards.length) % cards.length); setFlipped(false) }
  return <ProjectPanel>
    <Stack spacing={3}>
      <Box component="form" onSubmit={add} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr auto' }, gap: 1.5 }}>
        <TextField label="Front / question" value={front} onChange={(e) => setFront(e.target.value)} />
        <TextField label="Back / answer" value={back} onChange={(e) => setBack(e.target.value)} />
        <Button type="submit" variant="contained" startIcon={<AddRounded />}>Add card</Button>
      </Box>
      {!current ? <Typography color="text.secondary" align="center" sx={{ py: 4 }}>Add a flashcard to start studying.</Typography> : <>
        <Box role="button" tabIndex={0} onClick={() => setFlipped((value) => !value)} onKeyDown={(e) => e.key === 'Enter' && setFlipped((value) => !value)} sx={{ minHeight: 230, display: 'grid', placeItems: 'center', p: 4, borderRadius: 4, textAlign: 'center', cursor: 'pointer', bgcolor: (theme) => theme.palette.mode === 'dark' ? (flipped ? 'rgba(19,138,101,0.18)' : 'rgba(91,92,226,0.18)') : (flipped ? '#eefaf6' : '#f2efff'), border: '1px solid', borderColor: 'divider' }}>
          <Stack spacing={2} alignItems="center"><FlipRounded color="primary" /><Typography variant="h5" sx={{ fontWeight: 700 }}>{flipped ? current.back : current.front}</Typography><Typography variant="caption" color="text.secondary">Click card to flip</Typography></Stack>
        </Box>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Button disabled={cards.length < 2} onClick={() => move(-1)}>Previous</Button><Typography variant="body2">{index + 1} / {cards.length}</Typography><Stack direction="row"><Button disabled={cards.length < 2} onClick={() => move(1)}>Next</Button><IconButton aria-label="Delete flashcard" onClick={() => { const rest = cards.filter((card) => card.id !== current.id); setCards(rest); setIndex(Math.max(0, index - 1)); setFlipped(false) }}><DeleteOutlineRounded /></IconButton></Stack>
        </Stack>
      </>}
    </Stack>
  </ProjectPanel>
}
