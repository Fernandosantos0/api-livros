import { Router } from 'express';

// Importando os arquivos de rotas
import homeRoutes from './src/routes/homeRoutes';
import loginRoutes from './src/routes/loginRoutes';
import livroRotes from './src/routes/livroRotes';
import tokenRoutes from './src/routes/tokenRoutes';
import capaRoutes from './src/routes/capaRoutes';

const router = new Router();

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/livros', livroRotes);
router.use('/token', tokenRoutes);
router.use('/capa', capaRoutes);
router.use((req, res, next) => {
    return res.status(400).json({
        errors: 'Not found',
    });
});

export default router;
