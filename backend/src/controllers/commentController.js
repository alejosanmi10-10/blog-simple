import { fetchComments, addComment, removeComment } from "../services/commentService.js";

export const imprimirComentarios = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetchComments(id);
    res.send(response);
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    res.status(500).send({ message: "Error al obtener los comentarios" });
  }
};

export const crearComentario = async (req, res) => {
  try {
    const response = await addComment(req.body);
    res.send(response);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).send({ status: "Error", message: error.message });
    }
    console.error("Error en la base de datos:", error);
    res.status(500).send({ message: "Error en la base de datos" });
  }
};

export const eliminarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await removeComment(id);
    res.send(response);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).send({ message: error.message });
    }
    console.error("Error al eliminar comentario:", error);
    res.status(500).send({ message: "Error al eliminar comentario" });
  }
};
