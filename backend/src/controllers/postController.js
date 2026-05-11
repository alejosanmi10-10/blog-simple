import { addPost, fetchPosts, removePost, modifyPost } from "../services/postService.js";

export const crearPublicacion = async (req, res) => {
  try {
    const response = await addPost(req.body);
    res.status(201).send(response);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).send({ status: "Error", message: error.message });
    }
    console.error("Error al crear la publicación:", error);
    return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
  }
};

export const imprimirPublicaciones = async (req, res) => {
  try {
    const result = await fetchPosts();
    return res.status(200).json(result);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ status: "Error", message: error.message });
    }
    console.error("Error al imprimir las publicaciones:", error);
    return res.status(500).json({ status: "Error", message: "Error al imprimir las publicaciones" });
  }
};

export const eliminarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await removePost(id);
    res.send(response);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).send({ message: error.message });
    }
    console.error("Error al eliminar publicación:", error);
    res.status(500).send({ message: "Error al eliminar publicación" });
  }
};

export const editarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await modifyPost(id, req.body);
    res.send(response);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).send({ message: error.message });
    }
    console.error("Error al actualizar publicación:", error);
    res.status(500).send({ message: "Error al actualizar publicación" });
  }
};
