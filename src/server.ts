import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';

import authRoutes from './routes/Auth';
import userRoutes from './routes/User';
import todoRoutes from './routes/Todo';

const app = express(); // Initialise application
const PORT = config.server.port;

// Connect to Mongo
mongoose.set('strictQuery', false);
mongoose
    .connect(config.mongo.url)
    .then(() => {
        Logging.info('MongoDB connected successfully.');
        startServer();
    })
    .catch((error) => Logging.error(error));

// Start server only when mongoDB connects
const startServer = () => {
    // Log the request
    app.use((req, res, next) => {
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            // Log the response
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Rules of our API's
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    // Routes TODO: Add routes here...
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/todos', todoRoutes);

    // Health check
    app.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    // Error handling
    app.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);

        res.status(404).json({ message: error.message });
    });

    http.createServer(app).listen(PORT, () => Logging.info(`Server is running on port : ${PORT}`));
};
