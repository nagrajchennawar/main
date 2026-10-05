import { useMemo, useState } from 'react'
import { AddShoppingCartRounded, RemoveShoppingCartRounded } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import ProjectPanel from '../../projects/components/ProjectPanel'

const products = [{ id: 1, name: 'Canvas Tote', price: 18 }, { id: 2, name: 'Ceramic Mug', price: 14 }, { id: 3, name: 'Desk Plant', price: 22 }, { id: 4, name: 'Notebook Set', price: 12 }]

export default function ShoppingCart() {
  const [cart, setCart] = useState({})
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const total = useMemo(() => products.reduce((sum, item) => sum + item.price * (cart[item.id] || 0), 0), [cart])
  const add = (id) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
  const remove = (id) => setCart((current) => { const next = { ...current }; if (next[id] <= 1) delete next[id]; else next[id] -= 1; return next })
  return <ProjectPanel>
    <Stack spacing={2.5}>
      <Typography variant="body2" color="text.secondary">{count} item{count === 1 ? '' : 's'} in your cart</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}>
        {products.map((item) => <Box key={item.id} sx={{ p: 2, border: '1px solid #eceef4', borderRadius: 3 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Box><Typography sx={{ fontWeight: 700 }}>{item.name}</Typography><Typography color="text.secondary">${item.price.toFixed(2)}</Typography></Box>
            <Stack direction="row" sx={{ alignItems: 'center' }}>{cart[item.id] ? <><IconButton aria-label={`Remove one ${item.name}`} onClick={() => remove(item.id)}><RemoveShoppingCartRounded /></IconButton><Typography>{cart[item.id]}</Typography></> : null}<Button aria-label={`Add ${item.name} to cart`} onClick={() => add(item.id)} startIcon={<AddShoppingCartRounded />}>Add</Button></Stack>
          </Stack>
        </Box>)}
      </Box>
      <Box sx={{ p: 2, borderRadius: 3, bgcolor: '#f5f6ff', display: 'flex', justifyContent: 'space-between' }}><Typography sx={{ fontWeight: 700 }}>Cart total</Typography><Typography sx={{ fontWeight: 800 }}>${total.toFixed(2)}</Typography></Box>
    </Stack>
  </ProjectPanel>
}
