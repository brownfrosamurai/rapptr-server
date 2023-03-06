import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import Logging from '../library/Logging';
import { ITodo } from '../models/Todo';
import { IUser } from '../models/User';

export const validateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    },
    todo: {
        create: Joi.object<ITodo>({
            user: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required(),
            description: Joi.string().required()
        })
    }
};
