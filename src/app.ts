import express from 'express';
import morgan from 'morgan';
import cors, { CorsOptions } from "cors";
import connectDB from './repositories/index';
import mainRouter from './routers/index';


const { NODE_ENV, PORT, CLIENT_URL } = process.env;
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
const options : CorsOptions = {
    origin: CLIENT_URL
} 
app.use(cors(options));


app.use("/api", mainRouter);


await connectDB();

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT} [${NODE_ENV}]`)
})
