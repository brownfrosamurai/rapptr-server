import express from 'express';
import controller from '../controllers/Todo';
import { Schemas, validateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/', validateJoi(Schemas.todo.create), controller.createTodo);
router.get('/', controller.getTodos);
router.get('/:todoId', controller.getTodo);
router.put('/:todoId', controller.updateTodo);
router.delete('/:todoId', controller.deleteTodo);

export = router;
