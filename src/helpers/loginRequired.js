import dotenv from 'dotenv';
dotenv.config();

import lodash from 'lodash';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async function(req, res, next){
    const authorization = lodash.get(req, 'headers.authorization', false);

    // Verificando se existe um token na requisição
    if(!authorization) {
        return res.status(404).json({
            errors: 'Login requerido'
        });
    }

    // Capturando o token
    const [ ,token ] = authorization.split(' ');
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);

    if(!dados) {
        return res.status(404).json({
            errors: 'Token inválido ou expirado'
        })
    }

    try {
        const { nome, email, password } = dados;
        const user = await User.findOne({ where: { email, password_hash: password } });

        if(!user) {
            return res.status(404).json({
                errors: 'Login requerido'
            });
        }

        req.userId = user.id;
        req.userName = nome;
        req.userEmail = email;
        next();
    } catch(e) {
        return res.status(404).json({
            errors: 'Token inválido ou expirado.'
        });
    }
};
