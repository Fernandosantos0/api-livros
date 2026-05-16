import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

// Conexão com o banco de dados
import './src/database';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(helmet());
    }

    routes() {
        this.app.use(morgan('common'));
        this.app.use('/api', routes);
    }
}

export default new App().app;
