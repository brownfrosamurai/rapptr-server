import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.get('/get/:userId', controller.readUser);


export = router;
