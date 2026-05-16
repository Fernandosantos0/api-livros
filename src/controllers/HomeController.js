import User from '../models/User';
import Livro from '../models/Livro';

class HomeController {
    async index(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'nome', 'email', 'created_at', 'updated_at'],
                include: {
                    model: Livro,
                    attributes: [
                        'titulo',
                        'subtitulo',
                        'autores',
                        'editora',
                        'ano_publicacao',
                        'isbn',
                        'paginas',
                        'idioma',
                        'tipo_acabamento',
                        'genero',
                        'sinopse',
                        'classificacao',
                        'created_at',
                        'updated_at'
                    ]
                }
            });

            return res.status(200).json(users);
        } catch (e) {
            return res.status(404).json(null);
        }
    }
}

export default new HomeController();
