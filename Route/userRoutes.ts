import express, { Router } from 'express';
import { UserController } from '../Controller/UserController';

const router: Router = express.Router();
const userController = new UserController();

router.post('/', (req, res) => userController.addUser(req, res));
router.get('/:id', (req, res) => userController.getUser(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default router;
