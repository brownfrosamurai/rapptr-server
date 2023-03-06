import express from 'express';
import controller from '../controllers/Auth';
import { Schemas, validateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/register', validateJoi(Schemas.user.create), controller.registerUser);
router.post('/login', controller.loginUser);

export = router;
