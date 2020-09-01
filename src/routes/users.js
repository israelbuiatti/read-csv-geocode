import { Router } from 'express';

import UserController from '../app/controllers/UserController';


const routes = Router();
const userController = new UserController();

routes.get('/list', userController.list);
routes.get('/get', userController.get);
routes.get('/create', userController.create);
routes.get('/native', userController.native);
routes.get('/returnModel', userController.returnModel);

export default routes;