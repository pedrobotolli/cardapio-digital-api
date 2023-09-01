import express, {Express, Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { db } from './connectors/prisma';

dotenv.config();

const app: Express = express();

//Import route files
import productCategoryRoutes from "./routes/productCategoryRoutes"
import productRoutes from "./routes/productRoutes"
import orderRoutes from "./routes/orderRoutes"


//Data parsers for the request body
app.use(express.json())

app.use(morgan('dev'))

//Allowing CORS to FRONTEND reqs in another domain
app.use(cors())

//Define the route files here
app.use('/api/categories/', productCategoryRoutes)
app.use('/api/products/', productRoutes)
app.use('/api/orders/', orderRoutes)

//Error handling
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if(!error.status){
        console.log(error)
        return res.status(500).send({ error: error.message })
    }
    return res.status(error.status).send({ error: error.message })
})

//Starts the application server 
var port = 8000
app.listen(port, function () {
    console.log('Server running at: http://localhost:' + port)
})