import { useState } from 'react'
import { ContentCopyRounded, FormatQuoteRounded, RefreshRounded, ShareRounded } from '@mui/icons-material'
import { Alert, Button, Stack, Typography } from '@mui/material'
import ProjectPanel from './ProjectPanel'

const quotes = [
  { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { text: 'Great things are done by a series of small things brought together.', author: 'Vincent van Gogh' },
  { text: 'It always seems impossible until it is done.', author: 'Nelson Mandela' },
  { text: 'Well done is better than well said.', author: 'Benjamin Franklin' },
  { text: 'You do not have to see the whole staircase, just take the first step.', author: 'Martin Luther King Jr.' },
  { text: 'The future depends on what you do today.', author: 'Mahatma Gandhi' },
  { text: 'Act as if what you do makes a difference. It does.', author: 'William James' },
]

export default function QuoteGenerator() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [feedback, setFeedback] = useState('')
  const quote = quotes[quoteIndex]
  const quoteText = `“${quote.text}” — ${quote.author}`

  const generate = () => {
    setQuoteIndex((current) => (current + 1 + Math.floor(Math.random() * (quotes.length - 1))) % quotes.length)
    setFeedback('')
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(quoteText)
      setFeedback('Quote copied to clipboard.')
    } catch {
      setFeedback('Clipboard access is unavailable. Select and copy the quote manually.')
    }
  }
  const share = async () => {
    if (!navigator.share) {
      setFeedback('Sharing is not available in this browser. Use Copy quote instead.')
      return
    }
    try {
      await navigator.share({ text: quoteText })
      setFeedback('Quote shared.')
    } catch (error) {
      if (error.name !== 'AbortError') setFeedback('The quote could not be shared.')
    }
  }

  return (
    <ProjectPanel>
      <Stack spacing={3} sx={{ py: 2, textAlign: 'center', alignItems: 'center' }}>
        <FormatQuoteRounded sx={{ fontSize: 54, color: '#7656d8' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.5, maxWidth: 620 }}>{quote.text}</Typography>
        <Typography color="text.secondary">— {quote.author}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button variant="contained" startIcon={<RefreshRounded />} onClick={generate}>New quote</Button>
          <Button variant="outlined" startIcon={<ContentCopyRounded />} onClick={copy}>Copy quote</Button>
          <Button variant="outlined" startIcon={<ShareRounded />} onClick={share}>Share</Button>
        </Stack>
        {feedback && <Alert severity={feedback.includes('could not') || feedback.includes('not available') || feedback.includes('unavailable') ? 'warning' : 'success'}>{feedback}</Alert>}
      </Stack>
    </ProjectPanel>
  )
}
