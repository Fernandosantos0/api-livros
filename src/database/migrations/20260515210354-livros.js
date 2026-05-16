'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('livros', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        titulo: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },

        subtitulo: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
        },

        autores: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
        },

        editora: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
        },

        ano_publicacao: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        },

        isbn: {
            type: Sequelize.CHAR(13),
            allowNull: false,
            unique: true
        },

        paginas: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        },

        idioma: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
        },

        tipo_acabamento: {
            type: Sequelize.ENUM('Brochura', 'Capa Dura', 'eBook', 'Audiobook'),
            allowNull: true,
            defaultValue: null
        },

        genero: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
        },

        sinopse: {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null
        },

        classificacao: {
            type: Sequelize.ENUM('Livre', '+12', '+16', '+18'),
            allowNull: true,
            defaultValue: null
        },

        user_id_livro: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('livros');
  }
};
