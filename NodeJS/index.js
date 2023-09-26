const express = require('express')
const cors    = require('cors')
const UserRoute = require('./routes/UserRoutes')
const ProductRoute = require('./routes/ProductRoutes')

const app = express()

app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.static('public'))

app.use('/user', UserRoute)
app.use('/product', ProductRoute)

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000")
})