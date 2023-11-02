require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;
const {errorHandler} = require('./middleware/errorHandler');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/v1/meetups', require('./routers/MeetupRounter'));
app.use('*', (request, response)=> {
    response.status(404).json('Not Found')
})
app.use(errorHandler);
app.listen(PORT, ()=> console.log(`Port: ${PORT}`))
