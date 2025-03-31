import express from 'express';
import morgan from 'morgan';
import connectDB from './repositories/index';
import mainRouter from './routers/index';


const { NODE_ENV, PORT } = process.env;
const app = express();

app.use(morgan('tiny'));
app.use(express.json());


app.use("/api", mainRouter);


await connectDB();

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT} [${NODE_ENV}]`)
})
