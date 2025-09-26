import dotenv from 'dotenv'

dotenv.config()

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import authRoutes from './routes/auth.js'

const app = new Hono()
const PORT = process.env.PORT || 3000

app.get('/', (c) => {
  return c.text('Server is running on port 3000')
})

app.route('/api/auth', authRoutes)

serve({ fetch: app.fetch, port: Number(PORT) }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
