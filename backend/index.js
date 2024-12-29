const connectToMongo = require('./db');
var cors = require('cors');
const express = require('express');

connectToMongo();
const app = express()
const port = 5000 || process.env.PORT;

app.use(cors())
app.use(express.json())
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/notes', require('./routes/notes'));

app.listen(port, ()=>{
    console.log(`app listing at http://localhost:${port}`)
});