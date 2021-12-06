require('dotenv').config()
require('express-async-errors');

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const authmiddleware = require('./middleware/authentication')

const UserRoute = require('./routes/user')
const AuthRoute = require('./routes/auth')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.json())


//routes
app.get('/', (req, res) => {
    res.send('<h1>E-commmerce API</h1><a href="/api/v1/products">products route</a>');
  });

app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/user', authmiddleware, UserRoute)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


//server
const port = process.env.PORT || 5000

const start = async ()=>{
    try {
        await connectDB (process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()