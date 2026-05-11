import connection from "../config/db.js";

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT U.id, U.user, U.ciudad, U.programa_favorito, U.icono_perfil FROM users U`;
    connection.query(sql, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const updateAvatar = (id_usuario, icono_perfil) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE users SET icono_perfil = ? WHERE id = ?";
    connection.query(query, [icono_perfil, id_usuario], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};
