import dotenv from 'dotenv';
dotenv.config();

import lodash from 'lodash';
import validator from 'validator';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class TokenController {
    async store(req, res, next) {
        const email = lodash.get(req.body, 'email', false);
        const password = lodash.get(req.body, 'password', false);

        if (!email) {
            return res.status(404).json({
                errors: 'E-mail precisa ser enviado.'
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(404).json({
                errors: 'E-mail inválido.'
            });
        }

        if (!password) {
            return res.status(404).json({
                errors: 'Senha precisa ser enviado.'
            });
        }

        if (password.length < 6 || password.length > 16) {
            return res.status(404).json({
                errors: 'A senha precisa ter entre 6 a 16 caracteres'
            });
        }

        try {
            const user = await User.findOne({ where: { email } });

            // Verificando se o usuário existe
            if(!user) {
                return res.status(404).json({
                    errors: 'E-mail e/ou senha incorreta(s)'
                });
            }

            // Verificando se a senha corresponde com o que foi cadastrado no banco
            if(!await user.isPassword(password)) {
                return res.status(404).json({
                    errors: 'E-mail e/ou senha incorreta(s)'
                });
            }

            // Gerando o token
            const { id, nome } = user;
            const payload = {
                id,
                nome,
                email,
                password: user.password_hash
            };

            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION
            });

            return res.status(200).send({ token });
        } catch (e) {
            console.log(e)
            return res.status(404).json(e);
        }
    }
}

export default new TokenController();
