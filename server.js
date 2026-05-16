import 'colors';
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('server_on', function() {
    const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
    const SERVER_PORT = process.env.SERVER_PORT || 3001;

    app.listen(SERVER_PORT, SERVER_HOST, () => {
        console.log('Servidor inicializando'.yellow.bold);
        console.log(`Endereço - http://${SERVER_HOST}:${SERVER_PORT}/api`.green.bold);
    });
});

eventEmitter.emit('server_on');
