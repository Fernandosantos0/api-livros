import { DataTypes, Model } from 'sequelize';
import { ISBN } from 'isbn';

export default class Livro extends Model {
    static init(sequelize) {
        super.init({
            titulo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: 'Livro já cadastrado'
                },
                validate: {
                    notNull: {
                        msg: 'Não foi passado o título do livro.'
                    },
                    notEmpty: {
                        msg: 'O título do livro é obrigatório'
                    }
                }
            },

            subtitulo: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },

            autores: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },

            editora: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },

            ano_publicacao: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null,
                validate: {
                    isInt: {
                        msg: 'O valor precisa ser um número inteiro.'
                    }
                }
            },

            isbn: {
                type: DataTypes.CHAR(13),
                allowNull: false,
                unique: {
                    msg: 'Código ISBN já cadastrado'
                },
                validate: {
                    notNull: {
                        msg: 'Não foi passado o ISBN do livro.'
                    },
                    notEmpty: {
                        msg: 'O ISBN do livro é obrigatório.'
                    },
                    isNumeric: {
                        msg: 'O campo ISBN só aceita números.'
                    },

                    // Validando se foi enviado 10 ou 13 caracteres
                    isLen(digitos) {
                        if (!/^\d{10}$|^\d{13}$/.test(digitos)) {
                            throw new Error('O ISBN precisar ter 10 ou 13 caracteres para ser válido.');
                        }
                    },

                    // Válidando se o ISBN é válido
                    /*isISBN(isbn) {
                        const isbn10 = ISBN.asIsbn10(parseInt(isbn));
                        const isbn13 = ISBN.asIsbn13(parseInt(isbn));

                        console.log(isbn10, isbn13, isbn);

                        if(!isbn10 && !isbn13) {
                            throw new Error('O código ISBN é inválido.');
                        }
                    }*/
                }
            },

            paginas: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null,
                validate: {
                    isInt: {
                        msg: 'O valor precisa ser um número inteiro.'
                    }
                }
            },

            idioma: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
                validate: {
                    len: {
                        args: [2, 35],
                        msg: 'Só é permitido de 2 a 35 caracteres.'
                    }
                }
            },

            tipo_acabamento: {
                type: DataTypes.ENUM('Brochura', 'Capa Dura', 'eBook', 'Audiobook'),
                allowNull: true,
                defaultValue: null,
                validate: {
                    isIn: {
                        args: [[ 'Brochura', 'Capa Dura', 'eBook', 'Audiobook' ]],
                        msg: 'Opção inválida. Os tipos de acabamentos são: Brochura, Capa Dura, eBook ou Audiobook.'
                    }
                }
            },

            genero: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
                validate: {
                    len: {
                        args: [2, 29],
                        msg: 'Só é permitido de 2 a 29 caracteres.'
                    }
                }
            },

            sinopse: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: null
            },

            classificacao: {
                type: DataTypes.ENUM('Livre', '+12', '+16', '+18'),
                allowNull: true,
                defaultValue: null,
                validate: {
                    isIn: {
                        args: [[ 'Livre', '+12', '+16', '+18' ]],
                        msg: 'Opção inválida. Os status de classificações aceitos são: Livre, +12, +16, +18'
                    }
                }
            }
        }, {
            sequelize,
            charset: 'utf8'
        });

        return this;
    }

    static association(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id_livro' });
    }
}
