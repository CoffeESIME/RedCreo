import express from "express";
import config from './config.js'
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js';

const app = express();

//settings
app.set('port', config.port);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//middleware
app.use('/users', authRoutes);
app.use('/', userRoutes);
export default app;