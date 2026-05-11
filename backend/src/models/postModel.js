import connection from "../config/db.js";

export const findPostByTitle = (titulo) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM publicaciones WHERE titulo = ?";
    connection.query(query, [titulo], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const insertPost = (id_usuario, titulo, categoria, texto, imagen_url) => {
  return new Promise((resolve, reject) => {
    const sqlInsert = `INSERT INTO publicaciones (id_usuario, titulo, fecha, categoria, texto, imagen_url) VALUES (?, ?, DATE(NOW()), ?, ?, ?)`;
    connection.query(sqlInsert, [id_usuario, titulo, categoria, texto, imagen_url || null], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const getAllPosts = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT p.id, u.user AS usuario, u.icono_perfil, u.programa_favorito, p.titulo, p.fecha, p.categoria, p.texto, p.imagen_url FROM publicaciones p INNER JOIN users u ON p.id_usuario = u.id ORDER BY p.id DESC;`;
    connection.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const findPostById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM publicaciones WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const deletePostById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM publicaciones WHERE id = ?`;
    connection.query(sql, [id], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

export const updatePostById = (id, titulo, texto, categoria, imagen_url) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE publicaciones SET titulo = ?, texto = ?, categoria = ?, imagen_url = ? WHERE id = ?`;
    connection.query(sql, [titulo, texto, categoria, imagen_url || null, id], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
