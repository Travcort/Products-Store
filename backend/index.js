// Environment Variables
import { PORT } from './utils/config.js';

// Express
import express from 'express'
const app = express();
app.use(express.json());

// Logging
import {info,requestsLogger} from './utils/logger.js'
app.use(requestsLogger);


// Routing
import productRoutes from './routes/product.routes.js'
app.use('/api/products', productRoutes)

import Database from './models/product.model.js'

app.listen(PORT, () => {
    Database();
    info(`Server started on https://localhost:${PORT}`);
})