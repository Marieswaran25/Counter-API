import express, { Request, Response } from'express';
import {createServer} from 'http';
import {config} from 'dotenv'
import { PORT } from './config';
import cors from 'cors';
import Routes from './Routes';
import bodyParser from 'body-parser';
import { genRandomKey } from './Helpers/genRandomKey';


const app=express();
const server=createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 
app.get('/',(req:Request,res:Response)=>{
    res.send('<h1>Counter API')
})
app.use("/api/v1",Routes())

config({path:'./src/.env'})

server.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})

