require('dotenv').config();

module.exports = {
    dialect: 'mysql',
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
        charset: 'utf8',
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        'createdAt': 'created_at',
        'updatedAt': 'updated_at',
        dialectOptions: {
            collate: 'utf8_general_ci'
        },
    },
    dialectOptions: {
        timezone: '-03:00'
    },
    timezone: '-03:00'
};
