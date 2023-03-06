import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

const readUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).select('name, email id');

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};

export default {
    readUser
};
