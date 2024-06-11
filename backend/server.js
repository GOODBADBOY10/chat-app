import path from 'path'
import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


import authRoute from './routes/authRoute.js';
import messageRoute from './routes/messageRoute.js';
import userRoute from './routes/userRoute.js';


import connectToMongoDb from './db/connectToMongoDb.js';

const PORT = process.env.PORT || 5000;

const app = express()


dotenv.config();

// const __dirname = path.resolve()


// app.use(express.static(path.join(__dirname, '/frontend/dist')))

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
// })

// To parse the incoming requests from json payload from (req.body)
app.use(express.json());  
app.use(cookieParser());

// app.get('/', (req,res) => {
//     res.send('Hello world')
// })

app.use('/api/auth', authRoute)
app.use('/api/messages', messageRoute);
app.use('/api/users', userRoute);


app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`server has started on port ${PORT}`)
})