import { Router } from 'express';

const router = new Router();

// Middleware
import loginRequired from '../helpers/loginRequired';

// Importando o controller
import livroController from '../controllers/LivroController';

router.get('/', loginRequired, livroController.index);
router.get('/:id', loginRequired, livroController.show);
router.post('/', loginRequired, livroController.store);
router.put('/:id', loginRequired, livroController.update);
router.delete('/:id', loginRequired, livroController.delete);

export default router;
