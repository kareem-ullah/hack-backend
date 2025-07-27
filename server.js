const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require("./db/connect")
const authRouter = require("./routes/auth")
const userRoutes = require("./routes/userRoutes")

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', userRoutes)

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => 
    console.log('Server is listening. Port:', process.env.PORT || 5000)
  )
}).catch(err => console.log(err))