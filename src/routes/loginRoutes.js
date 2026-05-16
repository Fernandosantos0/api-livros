import { Router } from 'express';

const router = new Router();

import loginRequired from '../helpers/loginRequired';

// Importando o controller
import loginController from '../controllers/LoginController';

// router.get('/', loginRequired, loginController.index);
router.get('/', loginRequired, loginController.show);
router.put('/', loginRequired, loginController.update);
router.delete('/', loginRequired, loginController.delete);
router.post('/', loginController.store);

export default router;
