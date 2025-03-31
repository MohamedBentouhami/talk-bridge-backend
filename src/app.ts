import express from 'express';
import morgan from 'morgan';
import connectDB from './repositories';


const { NODE_ENV, PORT } = process.env;
const app = express();

app.use(morgan('tiny'));

await connectDB();

app.listen(NODE_ENV, ()=>{
    console.log(`The server is running on ${PORT} [${NODE_ENV}]`)
})
