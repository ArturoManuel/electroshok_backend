import {Sequelize, DataTypes} from 'sequelize';
import orm from '../config/sequelize.js';

export const Marca = orm.define('marca', {
    id_marca:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    }
},{
    tableName: 'marca',
    timestamps: false,
});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
}

