import { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material'
import { ExpandMoreRounded } from '@mui/icons-material'
import ProjectPanel from '../../projects/components/ProjectPanel'

const questions = [
  { question: 'How do I create a project?', answer: 'Open the Projects section and choose a project card to start using it.' },
  { question: 'Are my changes saved?', answer: 'These examples keep their state in the current page session. Connect storage to keep data after closing or refreshing.' },
  { question: 'Can I use these tools on mobile?', answer: 'Yes. The layouts adapt to small screens and are designed for touch as well as mouse input.' },
  { question: 'How can I get help?', answer: 'Contact your workspace administrator for help with your account or workspace settings.' },
]

export default function FaqAccordion() {
  const [expanded, setExpanded] = useState(false)
  return <ProjectPanel>
    <Stack spacing={1}>{questions.map((item, index) => (
      <Accordion key={item.question} expanded={expanded === `faq-${index}`} onChange={(_, isExpanded) => setExpanded(isExpanded ? `faq-${index}` : false)} disableGutters sx={{ border: '1px solid #edf0f5', borderRadius: '12px !important', boxShadow: 'none', '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreRounded />}><Typography sx={{ fontWeight: 700 }}>{item.question}</Typography></AccordionSummary>
        <AccordionDetails><Typography color="text.secondary">{item.answer}</Typography></AccordionDetails>
      </Accordion>
    ))}</Stack>
  </ProjectPanel>
}
