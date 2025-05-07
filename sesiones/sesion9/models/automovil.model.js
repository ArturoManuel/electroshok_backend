import {Sequelize, DataTypes} from 'sequelize';
import orm from '../config/sequelize.js';
import {Tipo} from './tipo.model.js';
import {Marca} from './marca.model.js';
import {Persona} from './persona.model.js';


export const Automovil = orm.define('automovil', {
    id_automovil:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecharegistro2:{
        type: DataTypes.DATE,
        field:"fecharegistro",
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
            isDate: true
        }
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30],
        }
    },
    precio:{
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    activo:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    id_marca:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        },
        references:{
            model:Marca,
            key:'id_marca'
        }
    },
    id_tipo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        },
        references:{
            model:Tipo,
            key:'id_tipo'
        }
    },
    id_persona:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: true
        },
        references:{
            model:Persona,
            key:'id_persona'
        }
    },
},{
    freezeTableName: true,
    tableName: 'automovil',
    timestamps: false,
});

Marca.hasMany(Automovil, {foreignKey:'id_marca'});
Automovil.belongsTo(Marca, {foreignKey:'id_marca'});

Tipo.hasMany(Automovil, {foreignKey:'id_tipo'});
Automovil.belongsTo(Tipo, {foreignKey:'id_tipo'});



export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
}

export const getAll = async function() {
    console.log("------------model------------");
    const results= await Automovil.findAll({
        include:[Marca, Tipo],
        where:{
            activo:true,            
        }
    });
    console.log(results);
    return results.map(u=>u.toJSON());
    /*const [results] = await orm.query(
            'select a.id_automovil , a.nombre , a.precio , '+
            'm.nombre as marca, t.nombre as tipo  '+
            'from bdprueba.automovil a '+
            'inner join bdprueba.marca m on a.id_marca=m.id_marca '+
            'left join bdprueba.tipo t on a.id_tipo=t.id_tipo '+
            'where a.activo = true', 
        );
    console.log(results);
    return results;*/
};

export const getById = async function(idAutomovil) {
    console.log("------------model------------");
    const results= await Automovil.findAll({
        include:[Marca, Tipo],
        where:{
            activo:true,
            id_automovil:idAutomovil
        }
    });
    console.log(results);
    return results.map(u=>u.toJSON());
    /*const [results] = await orm.query(
        'select a.id_automovil , a.nombre , a.precio , m.nombre as marca, t.nombre as tipo  '+
            'from bdprueba.automovil a '+
            'inner join bdprueba.marca m on a.id_marca=m.id_marca '+
            'left join bdprueba.tipo t on a.id_tipo=t.id_tipo '+
            'where a.activo = true and a.id_automovil=? ',
        {
          replacements: [idAutomovil]
        }
      );
    console.log("luego del query");
    console.log(results);
    return results;*/
};

export const create = async function(objAutomovil, id_persona) {
    try{
        const automovil= await Automovil.create({
            nombre:objAutomovil.nombre, 
            id_marca:objAutomovil.id_marca, 
            precio:objAutomovil.precio, 
            id_tipo:objAutomovil.id_tipo, 
            id_persona:id_persona
        });
        console.log(automovil);
        return automovil.toJSON().id_automovil;
    }catch(error){
        console.log("excepcion...");
        console.log(error);
        throw error;
    }
    /*const [insertResult] = await orm.query(
            'insert into bdprueba.automovil(nombre, id_marca, precio, activo, fecharegistro, id_tipo, id_persona) '+
            'values(?, ?, true, now(), ?, ?, ?)', 
            {
                replacements: [objAutomovil.nombre, objAutomovil.id_marca, objAutomovil.precio, objAutomovil.id_tipo, id_persona] 
            }
        );
        console.log(insertResult);
        return insertResult;*/
};


export const update = async function(id_automovil, objAutomovil) {
    try{
        const [updatedRows]= await Automovil.update({
            nombre:objAutomovil.nombre, 
            precio:objAutomovil.precio, 
            id_marca:objAutomovil.id_marca, 
            id_tipo:objAutomovil.id_tipo
        },{
            where:{
                id_automovil:id_automovil
            }
        });
        console.log(updatedRows);
        return updatedRows;
    }catch(error){
        console.log("excepcion...");
        console.log(error);
        throw error;
    }
    /*const [results] = await orm.query(
            'update bdprueba.automovil set precio=?, id_marca=?, id_tipo=? '+
            'where id_automovil=? ', 
            {
                replacements: [objAutomovil.precio, objAutomovil.id_marca, objAutomovil.id_tipo, id_automovil]
            }
        );
    console.log(results);
    return results;*/
};

export const deletes = async function(id_automovil) {
    try{
        const [updatedRows]= await Automovil.update({
            activo:false
        },{
            where:{
                id_automovil:id_automovil
            }
        });
        console.log(updatedRows);
        return updatedRows;
    }catch(error){
        console.log("excepcion...");
        console.log(error);
        throw error;
    }
    /*const [results] = await orm.query(
            'update bdprueba.automovil set activo=false '+
            'where id_automovil=? ', 
            {
                replacements: [id_automovil]
            }
        );
    console.log(results);
    return results;*/
};

export const getReporte = async function(preciobase) {
    console.log("------------model------------");
    const results= await orm.query('call bdprueba.get_reporte(?)',
        {
            replacements: [preciobase]
        }
    );
    console.log(results);
    return results;
};

