import connection from "../config/db.js";

export const getCommentsByPostId = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT c.id, u.user AS usuario, u.icono_perfil, u.programa_favorito, c.id_publicacion, c.comentario, c.fecha 
      FROM comentarios c 
      INNER JOIN users u ON c.id_usuario = u.id 
      WHERE c.id_publicacion = ?;
    `;
    connection.query(query, [id], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const insertComment = (id_usuario, id_publicacion, comentario) => {
  return new Promise((resolve, reject) => {
    const sqlInsert = `INSERT INTO comentarios (id_usuario, id_publicacion, comentario, fecha) VALUES (?, ?, ?, DATE(NOW()))`;
    connection.query(sqlInsert, [id_usuario, id_publicacion, comentario], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const findCommentById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM comentarios WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const deleteCommentById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM comentarios WHERE id = ?`;
    connection.query(sql, [id], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
