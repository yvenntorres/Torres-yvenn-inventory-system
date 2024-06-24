import { createConnection } from 'mysql';

const connection = createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory_system'
});

export const checkConnection = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySql database: ' + err.stack);
            return;
        }
        console.log('Connected to MySql database as id ' + connection.threadId);
    });

    return connection;
}

process.on('exit', () => {
    connection.end();
});