import 'module-alias/register'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from "body-parser"

dotenv.config()

import './connection'
import productController from '@/controllers/product.controller'
import cors from 'cors'

const PORT = process.env.PORT || 8080

const app = express()
//middleware
app.use(bodyParser.json())
app.use(cors())
//routes
app.get('/api/products', productController.findAll)
app.post('/api/products', productController.create)
app.get('/api/products/:id', productController.findOne)
app.put('/api/products/:id', productController.update)
app.delete('/api/products/:id', productController.delete)


app.get('/', (request, response) => {
  response.send("Server up")
})
app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`)
})
