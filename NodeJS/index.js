const express = require('express')
const cors    = require('cors')
const UserRoute = require('./routes/UserRoutes')

const app = express()

app.use(express.json())
app.use(cors({credentials: true, origin: 'http>//localhost:3000'}))
app.use(express.static('public'))

app.use('/user', UserRoute)

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000")
})