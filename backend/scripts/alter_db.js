import connection from './app/controllers/db.js';

connection.query("ALTER TABLE users ADD COLUMN icono_perfil VARCHAR(255) DEFAULT 'finn.png'", (err, results) => {
  if (err && err.code !== 'ER_DUP_FIELDNAME') {
    console.error("DB ERROR", err);
  } else {
    console.log("Column added or already exists.");
  }
  process.exit();
});
