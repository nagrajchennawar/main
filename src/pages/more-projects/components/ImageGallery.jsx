import { useState } from 'react'
import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material'
import ProjectPanel from '../../projects/components/ProjectPanel'

const images = [
  { title: 'Golden hour', color: 'linear-gradient(145deg, #f7bd7a, #e77569 55%, #7d527d)' },
  { title: 'Sea glass', color: 'linear-gradient(145deg, #a7e1d7, #48a8b5 55%, #25547b)' },
  { title: 'Wild garden', color: 'linear-gradient(145deg, #c8df8e, #55a57b 55%, #31566d)' },
  { title: 'Blue hour', color: 'linear-gradient(145deg, #b4cbfa, #7878c7 55%, #373b72)' },
  { title: 'Soft rose', color: 'linear-gradient(145deg, #ffd0c8, #de8cac 55%, #855e9c)' },
  { title: 'Desert light', color: 'linear-gradient(145deg, #f3d58b, #d99858 55%, #88594d)' },
]

export default function ImageGallery() {
  const [selected, setSelected] = useState(null)
  return <ProjectPanel maxWidth={980}>
    <Stack spacing={2}>
      <Typography color="text.secondary">Select an image tile to preview it.</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, minmax(0, 1fr))' }, gap: 1.5 }}>
        {images.map((image) => <Box key={image.title} role="button" tabIndex={0} aria-label={`Open ${image.title}`} onClick={() => setSelected(image)} onKeyDown={(event) => event.key === 'Enter' && setSelected(image)} sx={{ minHeight: { xs: 130, sm: 190 }, borderRadius: 3, background: image.color, cursor: 'pointer', display: 'flex', alignItems: 'flex-end', p: 2, color: 'white', boxShadow: 'inset 0 -70px 60px -55px rgba(0,0,0,.6)', transition: 'transform .18s ease', '&:hover': { transform: 'scale(1.02)' } }}><Typography sx={{ fontWeight: 700 }}>{image.title}</Typography></Box>)}
      </Box>
    </Stack>
    <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} maxWidth="md" fullWidth>
      {selected && <DialogContent sx={{ p: 1 }}><Box sx={{ height: { xs: 280, sm: 520 }, borderRadius: 2, background: selected.color, display: 'flex', alignItems: 'flex-end', p: 3, color: 'white' }}><Typography variant="h5" sx={{ fontWeight: 800 }}>{selected.title}</Typography></Box></DialogContent>}
    </Dialog>
  </ProjectPanel>
}
