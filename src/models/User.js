import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: 'O campo nome não pode está vazia.',
                        },

                        len: {
                            args: [2, 26],
                            msg: 'O nome precisa ter entre 2 a 26 caracteres.',
                        },
                        notNull: {
                            msg: 'Nome não foi enviado.'
                        }
                    },
                },
                email: {
                    type: Sequelize.STRING,
                    unique: {
                        msg: 'E-mail já existe',
                    },
                    allowNull: false,
                    validate: {
                        isEmail: {
                            msg: 'E-mail inválido.',
                        },
                        notNull: {
                            msg: 'E-mail não foi enviado.'
                        }
                    },
                },
                password: {
                    type: Sequelize.VIRTUAL,
                    allowNull: false,
                    validate: {
                        len: {
                            args: [6, 16],
                            msg: 'O senha precisa ter entre 6 a 16 caracteres para ser válido.',
                        },
                        notNull: {
                            msg: 'Senha não foi enviado.'
                        }
                    },
                },
                password_hash: {
                    type: Sequelize.STRING,
                },
            },
            {
                sequelize,
                charset: 'utf8',
            },
        );

        // Hook
        this.addHook('beforeSave', async user => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password_hash = await bcrypt.hash(user.password, salt);
            }
        });

        return this;
    }

    isPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }

    static association(models) {
        this.hasMany(models.Livro, { foreignKey: 'user_id_livro' });
    }
}
