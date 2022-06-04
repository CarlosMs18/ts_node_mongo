import express,{Application} from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

import AuthRoutes from './routes/auth.routes'
import UserRoutes from './routes/user.routes'

const app : Application = express()
const PORT = process.env.PORT



app.use(express.json())

app.use(morgan('dev'))

app.use('/api/auth',AuthRoutes)
app.use('/api/user',UserRoutes)





mongoose.connect('mongodb+srv://carlos:6EkWJ3ubCycjuFby@cluster0.m8hrx.mongodb.net/tsnode')
                .then(()=> {
                    console.log('Conectado a la Base de Datos')
                    app.listen(PORT, ()=> {
                        console.log(`Corriendo en el puerto ${PORT}`)
                    })
                    
                })
                .catch(error => console.log(error))




