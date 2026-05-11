import { findPostByTitle, insertPost, getAllPosts, findPostById, deletePostById, updatePostById } from "../models/postModel.js";

export const addPost = async (data) => {
  const { id_usuario, titulo, categoria, texto, imagen_url } = data;

  if (!id_usuario || !titulo || !categoria || !texto) {
    throw { status: 400, message: "Los campos están incompletos" };
  }

  if (titulo.length < 5 || titulo.length > 100) {
    throw { status: 400, message: "El título debe tener entre 5 y 100 caracteres" };
  }

  const results = await findPostByTitle(titulo);
  if (results.length > 0) {
    throw { status: 400, message: "La publicación ya existe" };
  }

  const result = await insertPost(id_usuario, titulo, categoria, texto, imagen_url);
  return { message: "Publicación creada con éxito", id: result.insertId };
};

export const fetchPosts = async () => {
  const results = await getAllPosts();
  if (!results || results.length === 0) {
    throw { status: 404, message: "No se encontraron publicaciones" };
  }
  return { status: "ok", publicaciones: results };
};

export const removePost = async (id) => {
  const results = await findPostById(id);
  if (results.length === 0) {
    throw { status: 404, message: "Publicación no encontrada" };
  }

  await deletePostById(id);
  return { message: "Publicación eliminada con éxito" };
};

export const modifyPost = async (id, data) => {
  const { titulo, texto, categoria, imagen_url } = data;

  const resultado = await findPostByTitle(titulo);
  if (resultado.length > 0 && resultado[0].id !== parseInt(id)) {
    throw { status: 400, message: "Título ya existe" };
  }

  await updatePostById(id, titulo, texto, categoria, imagen_url);
  return { message: "Publicación actualizada con éxito" };
};
