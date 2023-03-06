import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Todo, { ITodo } from '../models/Todo';
import Logging from '../library/Logging';

const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, user }: ITodo = req.body;

        if (!title || !description || !user) {
            return res.status(400).json({ error: 'All input fields are required' });
        }

        const todo = new Todo({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            user
        });

        await todo.save();
        res.status(200).json({ todo });
    } catch (error: any) {
        Logging.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todoId = req.params.todoId;

        const todo = await Todo.findById(todoId)
            .where({
                isDeleted: false
            })
            .populate('user', 'name email');

        if (todo?.isDeleted === false) return res.status(400).json({ error: 'Not Found' });

        res.status(200).json({ todo });
    } catch (error: any) {
        Logging.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await Todo.find()
            .where({
                isDeleted: false
            })
            .populate('user', 'name email');

        res.status(200).json({ todos });
    } catch (error: any) {
        Logging.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todoId = req.params.todoId;

        const todo = await Todo.findById(todoId)
        
        if (!todo) return res.status(404).json({ message: 'Not found' });

        todo?.set(req.body).save();

        res.status(200).json({ todo });
    } catch (error: any) {
        Logging.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todoId = req.params.todoId;

        const todo = await Todo.findById(todoId);

        if (!todo) return res.status(404).json({ message: 'Not found' });

        todo?.set({ isDeleted: true }).save();

        res.status(200).json({ message: 'Todo deleted' });
    } catch (error: any) {
        Logging.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo
};
