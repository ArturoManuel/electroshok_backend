import { CarritoItemModel } from "../models/carritoitem.model.js";

const listByUser = async (id_usuario) => {
  try {
    const results = await CarritoItemModel.listByUser(id_usuario);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addItem = async (dataItem) => {
  try {
    const id_item = await CarritoItemModel.addItem(dataItem);
    return id_item;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateAmount = async (id_item, dataItem) => {
  try {
    const updatedRows = await CarritoItemModel.updateAmount(id_item, dataItem);
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteItem = async (id_item) => {
  try {
    const updatedRows = await CarritoItemModel.deleteItem(id_item);
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteCart = async (id_usuario) => {
  try {
    const updatedRows = await CarritoItemModel.deleteCart(id_usuario);
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CarritoServices = {
  listByUser,
  addItem,
  updateAmount,
  deleteItem,
  deleteCart,
};
