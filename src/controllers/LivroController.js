import lodash from 'lodash';

import Livro from '../models/Livro';

class LivroController {
    async index(req, res, next) {
        try {
            const livros = await Livro.findAll({
                where: {
                    user_id_livro: req.userId
                }
            });
            return res.status(200).json(livros);
        } catch (e) {
            return res.status(404).json(null);
        }
    }

    async store(req, res, next) {
        try {
            const livro = await Livro.create({ ...req.body, user_id_livro: req.userId });

            return res.status(201).json(livro);
        } catch (e) {

            if(e.parent.code == 'ER_NO_REFERENCED_ROW_2') {
                return res.status(404).json({
                    errors: 'Não foi possível identificar o ID do usuário que cadastrou o livro.'
                });
            }

            if(e.parent.code == 'ER_NO_DEFAULT_FOR_FIELD') {
                return res.status(404).json({
                    errors: 'ID do usuário não foi enviado.'
                });
            }

            return res.status(404).json({
                errors: e.errors.map(err => err.message)
            });
        }
    }

    async show(req, res, next) {
        const id = lodash.get(req, 'params.id');
        const user_id_livro = lodash.get(req, 'userId');

        try {
            const livro = await Livro.findOne({
                where: {
                    id,
                    user_id_livro
                }
            });

            if(!livro) {
                return res.status(404).json({
                    errors: 'Nenhum livro foi encontrado.'
                });
            }

            return res.status(200).json(livro);
        } catch(e) {
            return res.status(404).json(null);
        }
    }

    async update(req, res, next) {
        const id = lodash.get(req, 'params.id', false);
        const user_id_livro = lodash.get(req, 'userId');

        if(!id) {
            return res.status(404).json({
                errors: 'ID do livro não foi enviado'
            });
        }

        try {
            const livro = await Livro.findOne({
                where: {
                    id,
                    user_id_livro
                }
            });

            if(!livro) {
                return res.status(404).json({
                    errors: 'Livro não encontrado.'
                });
            }

            const livroAtualizado = await livro.update(req.body);

            return res.status(200).send(livroAtualizado);
        } catch(e) {
            return res.status(404).json(null);
        }
    }

    async delete(req, res, next) {
        const id = lodash.get(req, 'params.id', false);
        const user_id_livro = lodash.get(req, 'userId');

        if(!id) {
            return res.status(404).json({
                errors: 'ID do livro não foi enviado'
            });
        }

        try {
            const livro = await Livro.findOne({
                where: {
                    id,
                    user_id_livro
                }
            });

            if(!livro) {
                return res.status(404).json({
                    errors: 'Livro não encontrado.'
                });
            }

            // Apagando o livro do banco de dados
            await livro.destroy({ force: true });

            return res.status(200).json(livro);
        } catch(e) {
            return res.status(404).json(null);
        }
    }
}

export default new LivroController();
