import { 
  fetchRanking, toggleReaction, getTotalReactions, getUsersReactions, 
  toggleUserFavorite, fetchUserFavorites 
} from "../services/reactionService.js";

export const imprimirRanking = async (req, res) => {
  try {
    const result = await fetchRanking();
    return res.status(200).json(result);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ status: "Error", message: error.message });
    }
    return res.status(500).json({ status: "Error", message: "Error al imprimir el ranking" });
  }
};

export const reaccionar = async (req, res) => {
  try {
    const { id_usuario, id_publicacion } = req.body;
    const response = await toggleReaction(id_usuario, id_publicacion);
    res.send(response);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).send({ status: "Error", message: error.message });
    }
    res.status(500).send({ status: "Error", message: "Error interno" });
  }
};

export const obtenerReacciones = async (req, res) => {
  try {
    const { id_publicacion } = req.params;
    const response = await getTotalReactions(id_publicacion);
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const obtenerUsuariosReacciones = async (req, res) => {
  try {
    const { id_publicacion } = req.params;
    const response = await getUsersReactions(id_publicacion);
    res.send(response);
  } catch (error) {
    res.status(500).send({ status: "Error", message: "Error en la base de datos" });
  }
};

export const toggleFavorito = async (req, res) => {
  try {
    const { id_usuario, id_publicacion } = req.body;
    const response = await toggleUserFavorite(id_usuario, id_publicacion);
    res.send(response);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).send({ status: "Error", message: error.message });
    }
    res.status(500).send({ status: "Error", message: "Error comprobando favoritos" });
  }
};

export const obtenerFavoritos = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const response = await fetchUserFavorites(id_usuario);
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
