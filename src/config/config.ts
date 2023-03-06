import dotenv from 'dotenv';

// initialise dotenv 
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || '';
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 1337;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
