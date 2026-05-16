import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Livro from '../models/Livro';

const models = [User, Livro];

const conexao = new Sequelize(databaseConfig);

models.forEach(model => model.init(conexao));
models.forEach(model => model.association && model.association(conexao.models));
