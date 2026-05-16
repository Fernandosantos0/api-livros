import lodash from 'lodash';

import User from '../models/User';

class LoginController {
    async index(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'nome', 'email', 'created_at', 'updated_at'],
                order: [['created_at', 'ASC']]
            });
            return res.status(200).json(users);
        } catch (e) {
            return res.status(404).json(null);
        }
    }

    async show(req, res, next) {
        const userId = lodash.get(req, 'userId', false);

        if (!userId) {
            return res.status(200).json({
                errors: 'Houve um erro inesperado, ID do usuário não encontrado ou não existe.'
            });
        }

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(200).json({
                    errors: 'Usuário não existe.'
                });
            }

            const { id, nome, email, created_at, updated_at } = user;
            return res.status(200).json({
                id,
                nome,
                email,
                created_at,
                updated_at
            });
        } catch (e) {
            return res.status(404).json(null);
        }
    }

    async update(req, res, next) {
        const userId = lodash.get(req, 'userId', 0);

        if (!userId) {
            return res.status(200).json({
                errors: 'Houve um erro inesperado, ID do usuário não encontrado ou não existe.'
            });
        }

        try {
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(200).json({
                    errors: 'Usuário não existe.'
                });
            }

            const userUpdate = await user.update(req.body);
            const { id, nome, email, created_at, updated_at } = userUpdate;
            return res.status(200).json({
                id,
                nome,
                email,
                created_at,
                updated_at
            });
        } catch (e) {
            return res.status(404).json({
                errors: e.errors.map(err => err.message)
            });
        }
    }

    async store(req, res, next) {
        try {
            const user = await User.create(req.body);
            const { id, nome, email, created_at, updated_at } = user;
            return res.status(201).json({
                id,
                nome,
                email,
                created_at,
                updated_at
            });
        } catch (e) {
            return res.status(404).json({
                errors: e.errors.map(err => err.message)
            });
        }
    }

    async delete(req, res, next) {
        const userId = lodash.get(req, 'userId', false);

        if (!userId) {
            return res.status(200).json({
                errors: 'Houve um erro inesperado, ID do usuário não encontrado ou não existe.'
            });
        }

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(200).json({
                    errors: 'Usuário não existe.'
                });
            }

            const { id, nome, email, created_at, updated_at } = user;

            // Apagando
            await user.destroy({ force: true });
            return res.status(200).json({
                id,
                nome,
                email,
                created_at,
                updated_at
            });
        } catch (e) {
            return res.status(404).json({
                errors: 'Houve um erro ao apagar usuário.'
            });
        }
    }
}

export default new LoginController();
