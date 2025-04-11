import express from 'express';
import morgan from 'morgan';
import cors, { CorsOptions } from "cors";
import connectDB from './repositories/index';
import mainRouter from './routers/index';
import { app, server } from './socket';
import path from "path";


const { NODE_ENV, PORT, CLIENT_URL } = process.env;


app.use(morgan('tiny'));
app.use(express.json());


app.use(express.static(path.join('public')));


const options : CorsOptions = {
    origin: CLIENT_URL
} 
app.use(cors(options));


app.use("/api", mainRouter);

await connectDB();

server.listen(PORT, () => {
    console.log(`The server is running on ${PORT} [${NODE_ENV}]`)
})
