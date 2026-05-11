import connection from "../config/db.js";

export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE user = ?";
    connection.query(query, [username], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const createUser = (user, email, hashContraseña, fechaCreacion, ciudad, programa_favorito, rol, iconoFinal) => {
  return new Promise((resolve, reject) => {
    const insertQuery = "INSERT INTO users (user, email, password, dc, ciudad, programa_favorito, rol, icono_perfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(insertQuery, [user, email, hashContraseña, fechaCreacion, ciudad, programa_favorito, rol, iconoFinal], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};
