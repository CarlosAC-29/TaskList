// Archivo que arranca server
// Correr server con Npm run dev

const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const {PORT} = require('./config')

console.log(typeof(PORT))


const taskRoutes = require('./routes/taks.routes')

app.get("/", (req, res) => {res.send("Server is running on port "+PORT+" tipo de dato "+typeof(PORT))})
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(taskRoutes)
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen(PORT)
