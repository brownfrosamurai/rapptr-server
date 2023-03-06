import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Logging from '../library/Logging';
import User from '../models/User';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).json({ error: 'All input fields are required!' });

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser.id, email }, process.env?.JWT_SECRET as string);
        
        res.status(200).json({ savedUser, token });
    } catch (error: any) {
        Logging.error(error);
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'All input fields are required!' });

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: 'Incorrect email or password' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ error: 'Incorrect email or password' });

        const token = jwt.sign({ id: user.id, email }, process.env?.JWT_SECRET as string);

        res.status(200).json({ user, token });
    } catch (error: any) {
        Logging.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default {
    registerUser,
    loginUser
};
