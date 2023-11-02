require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.listen(PORT, ()=> console.log(`Port: ${PORT}`))
