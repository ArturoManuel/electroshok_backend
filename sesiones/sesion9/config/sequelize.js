import Sequelize from 'sequelize';

// Configuración de la conexión
const orm = new Sequelize('bdprueba2', 'root', '1234', 
        {
            host: 'localhost', 
            dialect: 'mysql',
            pool: {
                max: 2,
                idle: 10000,
                acquire: 60000,
            },
        }
    );

export default orm;
