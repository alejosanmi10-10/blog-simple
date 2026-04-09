import connection from './app/controllers/db.js';

const sql1 = "ALTER TABLE publicaciones ADD COLUMN imagen_url VARCHAR(500) DEFAULT NULL";
connection.query(sql1, (err, results) => {
  if (err && err.code !== 'ER_DUP_FIELDNAME') {
    console.error("DB ERROR publicaciones: ", err);
  } else {
    console.log("Column imagen_url added to publicaciones or already exists.");
  }
  
  const sql2 = `CREATE TABLE IF NOT EXISTS favoritos (
    id INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_publicacion INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id) ON DELETE CASCADE,
    UNIQUE KEY (id_usuario, id_publicacion)
  )`;
  
  connection.query(sql2, (err, results) => {
    if (err) {
      console.error("DB ERROR favoritos: ", err);
    } else {
      console.log("Table favoritos verified/created.");
    }
    process.exit();
  });
});
