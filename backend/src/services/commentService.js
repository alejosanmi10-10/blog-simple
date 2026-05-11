import { getCommentsByPostId, insertComment, findCommentById, deleteCommentById } from "../models/commentModel.js";

export const fetchComments = async (id_publicacion) => {
  const results = await getCommentsByPostId(id_publicacion);
  return { status: "Success", data: results };
};

export const addComment = async (data) => {
  const { id_usuario, id_publicacion, comentario } = data;

  if (!id_usuario || !id_publicacion || !comentario) {
    throw { status: 400, message: "faltan datos" };
  }

  if (comentario.trim().length === 0 || comentario.length > 500) {
    throw { status: 400, message: "El comentario no puede estar vacío ni superar los 500 caracteres" };
  }

  const result = await insertComment(id_usuario, id_publicacion, comentario);
  return { message: "comentario creado con exito", id: result.insertId };
};

export const removeComment = async (id) => {
  const results = await findCommentById(id);
  if (results.length === 0) {
    throw { status: 404, message: "Comentario ausente" };
  }

  await deleteCommentById(id);
  return { message: "Comentario eliminado exitosamente" };
};
