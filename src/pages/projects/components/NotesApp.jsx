import { useMemo, useState } from 'react'
import { AddRounded, DeleteOutlineRounded, EditRounded, SaveRounded, SearchRounded } from '@mui/icons-material'
import { Alert, Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import ProjectPanel from './ProjectPanel'

export default function NotesApp() {
  const [notes, setNotes] = useState([])
  const [query, setQuery] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editing, setEditing] = useState(null)

  const filteredNotes = useMemo(() => {
    const term = query.trim().toLowerCase()
    return notes.filter((note) => !term || `${note.title} ${note.content}`.toLowerCase().includes(term))
  }, [notes, query])

  const saveNote = (event) => {
    event.preventDefault()
    if (!title.trim() || !content.trim()) return
    if (editing !== null) {
      setNotes((current) => current.map((note) => note.id === editing
        ? { ...note, title: title.trim(), content: content.trim(), updatedAt: Date.now() }
        : note))
    } else {
      setNotes((current) => [{ id: Date.now(), title: title.trim(), content: content.trim(), updatedAt: Date.now() }, ...current])
    }
    setTitle('')
    setContent('')
    setEditing(null)
  }

  const editNote = (note) => {
    setEditing(note.id)
    setTitle(note.title)
    setContent(note.content)
  }

  return (
    <ProjectPanel>
      <Stack spacing={2.5}>
        <TextField
          fullWidth
          placeholder="Search your notes"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchRounded /></InputAdornment> } }}
        />
        <Box component="form" onSubmit={saveNote}>
          <Stack spacing={1.5}>
            <TextField fullWidth label="Note title" value={title} onChange={(event) => setTitle(event.target.value)} />
            <TextField fullWidth label="Write a note..." multiline minRows={3} value={content} onChange={(event) => setContent(event.target.value)} />
            <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
              {editing !== null && <Button onClick={() => { setEditing(null); setTitle(''); setContent('') }}>Cancel</Button>}
              <Button type="submit" variant="contained" startIcon={editing !== null ? <SaveRounded /> : <AddRounded />} disabled={!title.trim() || !content.trim()}>
                {editing !== null ? 'Save changes' : 'Add note'}
              </Button>
            </Stack>
          </Stack>
        </Box>
        {filteredNotes.length === 0 ? (
          <Alert severity="info">{query ? 'No notes match your search.' : 'Your notes will appear here after you add one.'}</Alert>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}>
            {filteredNotes.map((note) => (
              <Box key={note.id} sx={{ p: 2, borderRadius: 3, bgcolor: '#f8f9fc', border: '1px solid #eef0f5' }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 800, overflowWrap: 'anywhere' }}>{note.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{note.content}</Typography>
                  </Box>
                  <Stack direction="row">
                    <IconButton aria-label={`Edit ${note.title}`} onClick={() => editNote(note)}><EditRounded fontSize="small" /></IconButton>
                    <IconButton aria-label={`Delete ${note.title}`} onClick={() => setNotes((current) => current.filter((item) => item.id !== note.id))}><DeleteOutlineRounded fontSize="small" /></IconButton>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Box>
        )}
      </Stack>
    </ProjectPanel>
  )
}
