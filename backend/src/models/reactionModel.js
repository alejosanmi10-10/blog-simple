import connection from "../config/db.js";

export const getRanking = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT p.id, p.titulo, COUNT(c.id) AS cantidad_comentarios
      FROM publicaciones p
      LEFT JOIN comentarios c ON p.id = c.id_publicacion
      GROUP BY p.id
      ORDER BY cantidad_comentarios DESC
      LIMIT 3;
    `;
    connection.query(sql, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const checkReaction = (id_usuario, id_publicacion) => {
  return new Promise((resolve, reject) => {
    const checkQuery = "SELECT * FROM reacciones WHERE id_usuario = ? AND id_publicacion = ?";
    connection.query(checkQuery, [id_usuario, id_publicacion], (error, results) => {
      if (error) {
        const createTable = `CREATE TABLE IF NOT EXISTS reacciones (
          id INT NOT NULL AUTO_INCREMENT,
          id_usuario INT NOT NULL,
          id_publicacion INT NOT NULL,
          PRIMARY KEY (id),
          FOREIGN KEY (id_usuario) REFERENCES users(id),
          FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id)
        )`;
        connection.query(createTable, () => {
          reject({ tableCreated: true });
        });
      } else {
        resolve(results);
      }
    });
  });
};

export const deleteReaction = (id_usuario, id_publicacion) => {
  return new Promise((resolve, reject) => {
    const deleteQuery = "DELETE FROM reacciones WHERE id_usuario = ? AND id_publicacion = ?";
    connection.query(deleteQuery, [id_usuario, id_publicacion], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const insertReaction = (id_usuario, id_publicacion) => {
  return new Promise((resolve, reject) => {
    const insertQuery = "INSERT INTO reacciones (id_usuario, id_publicacion) VALUES (?, ?)";
    connection.query(insertQuery, [id_usuario, id_publicacion], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const countReactions = (id_publicacion) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(*) as total FROM reacciones WHERE id_publicacion = ?";
    connection.query(sql, [id_publicacion], (error, results) => {
      if (error) reject(error);
      resolve(results[0].total);
    });
  });
};

export const getReactionUsers = (id_publicacion) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT u.user as usuario 
      FROM reacciones r
      INNER JOIN users u ON r.id_usuario = u.id
      WHERE r.id_publicacion = ?
    `;
    connection.query(sql, [id_publicacion], (error, results) => {
      if (error) reject(error);
      resolve(results.map(row => row.usuario));
    });
  });
};

export const checkFavorite = (id_usuario, id_publicacion) => {
  return new Promise((resolve, reject) => {
    const checkQuery = "SELECT * FROM favoritos WHERE id_usuario = ? AND id_publicacion = ?";
    connection.query(checkQuery, [id_usuario, id_publicacion], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const deleteFavorite = (id_usuario, id_publicacion) => {
  return new Promise((resolve, reject) => {
    const deleteQuery = "DELETE FROM favoritos WHERE id_usuario = ? AND id_publicacion = ?";
    connection.query(deleteQuery, [id_usuario, id_publicacion], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const insertFavorite = (id_usuario, id_publicacion) => {
  return new Promise((resolve, reject) => {
    const insertQuery = "INSERT INTO favoritos (id_usuario, id_publicacion) VALUES (?, ?)";
    connection.query(insertQuery, [id_usuario, id_publicacion], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const getFavoritesByUser = (id_usuario) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT p.*, f.id as favorito_id 
      FROM favoritos f
      INNER JOIN publicaciones p ON f.id_publicacion = p.id
      WHERE f.id_usuario = ?
    `;
    connection.query(sql, [id_usuario], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};
