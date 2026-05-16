'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    nome: 'admin',
                    email: 'admin@gmail.com',
                    password_hash: bcrypt.hashSync('americalatina', 10),
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    nome: 'Carlos',
                    email: 'carlos@gmail.com',
                    password_hash: bcrypt.hashSync('americalatina', 10),
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    nome: 'Beatriz',
                    email: 'beatriz@gmail.com',
                    password_hash: bcrypt.hashSync('americalatina', 10),
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    nome: 'Will Smith',
                    email: 'will@gmail.com',
                    password_hash: bcrypt.hashSync('americalatina', 10),
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    nome: 'Fernanda',
                    email: 'fernanda@yahoo.com',
                    password_hash: bcrypt.hashSync('americalatina', 10),
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('users', null, {});
    }
};
