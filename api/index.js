import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()
mongoose.connect(process.env.MONGO).then(() => {
    console.log(`Connected to MongoDB`)
})
.catch((err) => {
    console.log(err)
})

const app = express()
const PORT = 3000
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})
//middlewares
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode: statusCode
    })
})