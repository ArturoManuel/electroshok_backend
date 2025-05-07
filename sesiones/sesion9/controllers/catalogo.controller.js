import * as scatalogo from "../services/catalogo.service.js";

export const getAll = async function(req, res) {
    console.log("------------controller------------");
    try{
        const automoviles= await scatalogo.getAll();
        console.log("... despues de scatalogo.getAll()");
        res.json(automoviles || []);    
    }
    catch(error){
        res.status(500).json({"error":"Error obteniendo registros"});
    };
};

export const getById = async function(req, res) {
    console.log("req.params.id: "+req.params.id);
    try{
        let automoviles= await scatalogo.getById(req.params.id);
        console.log("... despues de scatalogo.getById()");
        res.json(automoviles || {});
    }catch(error){
        res.status(500).json({"error":"Error obteniendo registros"});
    };
};

export const create = async function(req, res) {
    const objAutomovil=req.body;
    console.log(objAutomovil);
    console.log(req.user);

    try{
        let idAutomovil= await scatalogo.create(objAutomovil, req.user.id_persona);
        console.log("... despues de scatalogo.create()");
        res.json( {"idAutomovil":idAutomovil} );
    }catch(error){
        res.status(500).json({"error":"Error ingresando registros"});
    };
};

export const update = function(req, res) {
    console.log("------------controller------------");
    const objAutomovil=req.body;
    console.log(objAutomovil);
    scatalogo.update(req.params.id, objAutomovil)
    .then(numRegistros => {
        console.log("... despues de scatalogo.update()");
        res.json( {"numRegistros":numRegistros} );
    })
    .catch(err => {
        res.status(500).json({"error":"Error actualizando registros"});
    });
};

export const deletes = function(req, res) {
    scatalogo.deletes(req.params.id)
    .then(numRegistros => {
        console.log("... despues de scatalogo.deletes()");
        res.json( {"numRegistros":numRegistros} );
    })
    .catch(err => {
        res.status(500).json({"error":"Error eliminando registros"});
    });
};

export const getReporte = async function(req, res) {
    console.log(req.body.preciobase);

    try{
        let automoviles= await scatalogo.getReporte(req.body.preciobase);
        console.log("... despues de scatalogo.getReporte()");
        res.json( automoviles || [] );
    }catch(error){
        res.status(500).json({"error":"Error obteniendo registros"});
    };
};

