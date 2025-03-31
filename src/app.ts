import express from 'express';
import morgan from 'morgan';


const { NODE_ENV, PORT } = process.env;
const app = express();

app.use(morgan('tiny'));


app.listen(NODE_ENV, ()=>{
    console.log(`The server is running on ${PORT} [${NODE_ENV}]`)
})