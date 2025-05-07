import * as modelAutomovil from "../models/automovil.model.js";

export const getAll = async function() {
    console.log("------------service------------");
    const results= await modelAutomovil.getAll();
    return results;
};

export const getById = async function(idAutomovil) {
    console.log("------------service------------");
    //await modelAutomovil.connect();
    const results= await modelAutomovil.getById(idAutomovil);
    console.log("luego del modelAutomovil");
    return results;
};

export const create = async function(objAutomovil, id_persona) {
    const idAutomovil= await modelAutomovil.create(objAutomovil, id_persona); 
    return idAutomovil;
};

export const update = async function(id_automovil, objAutomovil) {
    const results= await modelAutomovil.update(id_automovil, objAutomovil);
    return results;
};

export const deletes = async function(id_automovil) {
    const results= await modelAutomovil.deletes(id_automovil);
    return results;
};

export const getReporte = async function(preciobase) {
    const results= await modelAutomovil.getReporte(preciobase);
    return results;
};


