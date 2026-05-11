import { 
  getRanking, checkReaction, deleteReaction, insertReaction, countReactions, 
  getReactionUsers, checkFavorite, deleteFavorite, insertFavorite, getFavoritesByUser 
} from "../models/reactionModel.js";

export const fetchRanking = async () => {
  const results = await getRanking();
  if (!results || results.length === 0) {
    throw { status: 404, message: "No se encontraron comentarios" };
  }
  return { status: "ok", ranking: results };
};

export const toggleReaction = async (id_usuario, id_publicacion) => {
  if (!id_usuario || !id_publicacion) {
    throw { status: 400, message: "Datos incompletos" };
  }

  try {
    const results = await checkReaction(id_usuario, id_publicacion);
    if (results.length > 0) {
      await deleteReaction(id_usuario, id_publicacion);
      return { status: "ok", message: "Reacción eliminada", accion: "quitado" };
    } else {
      await insertReaction(id_usuario, id_publicacion);
      return { status: "ok", message: "Reacción añadida", accion: "puesto" };
    }
  } catch (error) {
    if (error.tableCreated) {
      throw { status: 500, message: "Tabla de reacciones creada, por favor intente de nuevo." };
    }
    throw error;
  }
};

export const getTotalReactions = async (id_publicacion) => {
  const total = await countReactions(id_publicacion);
  return { status: "ok", total };
};

export const getUsersReactions = async (id_publicacion) => {
  const usuarios = await getReactionUsers(id_publicacion);
  return { status: "ok", usuarios };
};

export const toggleUserFavorite = async (id_usuario, id_publicacion) => {
  if (!id_usuario || !id_publicacion) {
    throw { status: 400, message: "Datos incompletos" };
  }

  const results = await checkFavorite(id_usuario, id_publicacion);
  if (results.length > 0) {
    await deleteFavorite(id_usuario, id_publicacion);
    return { status: "ok", message: "Eliminado de favoritos", accion: "quitado" };
  } else {
    await insertFavorite(id_usuario, id_publicacion);
    return { status: "ok", message: "Añadido a favoritos", accion: "puesto" };
  }
};

export const fetchUserFavorites = async (id_usuario) => {
  const favoritos = await getFavoritesByUser(id_usuario);
  return { status: "ok", favoritos };
};
