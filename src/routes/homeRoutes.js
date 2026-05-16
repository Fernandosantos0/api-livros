import { Router } from 'express';

const router = new Router();

// Importando o controller
import homeController from '../controllers/HomeController';

router.get('/', homeController.index);

export default router;
