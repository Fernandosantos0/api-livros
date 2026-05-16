import { Router } from 'express';

const router = new Router();

// Importando o controller
import tokenController from '../controllers/TokenController';

router.post('/', tokenController.store);

export default router;
