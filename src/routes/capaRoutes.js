import { Router } from 'express';

import loginRequired from '../helpers/loginRequired';

import capaController from '../controllers/CapaController';

const router = new Router();

router.post('/:id', loginRequired, capaController.store);

export default router;
