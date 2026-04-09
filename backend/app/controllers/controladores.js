//importaciones
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import connection from "./db.js";
import { response } from 'express';
import { z } from "zod";
dotenv.config();


async function login(req, res) {
    const loginSchema = z.object({
        email: z.string().email("Debe ser un email válido"),
        password: z.string().min(8, "La contraseña debe tener mínimo 8 caracteres")
    });

    const validacion = loginSchema.safeParse(req.body);

    if (!validacion.success) {
        return res.status(400).send({ status: "Error", message: validacion.error.errors[0].message });
    }

    const { email, password } = validacion.data;

    try {
        const query = 'SELECT * FROM users WHERE email = ?';
      
        connection.query(query, [email], (error, results, fields) => {
            if (error) {
                console.error("Error durante el inicio de sesión:", error);
                return res.status(500).send({ status: "Error", message: "Datos invalidos" });
            }

            if (results.length === 0) {
                return res.status(400).send({ status: "Error", message: "No existe el usuario" });
            }
            console.log(results)
            
            //comparacion de la contraseña con bcrypts
            const usuarioRevisar = results[0];
            bcryptjs.compare(password, usuarioRevisar.password, (compareError, logincorrecto) => {
                if (compareError) {
                    console.error("Error durante el inicio de sesión:", compareError);
                    return res.status(500).send({ status: "Error", message: "Contraseña incorrecta" });
                }

                if (!logincorrecto) {
                    return res.status(400).send({ status: "Error", message: "verificar los datos ingresados" });
                }

                const token = jsonwebtoken.sign(
                    { id: usuarioRevisar.id, user: usuarioRevisar.user, rol: usuarioRevisar.rol },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRATION }
                );

                const cookieOption = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    path: "/",
                    sameSite: 'Lax' 
                };

                res.cookie("jwt", token, cookieOption);
                res.send({ status: "ok", message: "Usuario loggeado", token, "usuario": results });
            });
        });
    } catch (error) {
        return res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}


async function register(req, res) {
    try {
        const registerSchema = z.object({
            user: z.string().min(3, "El nombre de usuario debe ser mayor a 3 letras"),
            email: z.string().email("Formato de email inválido"),
            password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
            ciudad: z.string().min(2, "Debes incluir tu ciudad"),
            programa_favorito: z.string().min(2, "Debes seleccionar un programa favorito"),
            icono_perfil: z.string().optional()
        });

        const validacion = registerSchema.safeParse(req.body);

        if (!validacion.success) {
            return res.status(400).send({ status: "Error", message: validacion.error.errors[0].message });
        }

        const { user, email, password, ciudad, programa_favorito, icono_perfil } = validacion.data;

       
        const query = "SELECT * FROM users WHERE user = ?";
        connection.query(query, [user], async (error, results, fields) => {
            if (error) {
                return res.status(500).send({ status: "Error", message: "El usuario ya existe" });
            }

            if (results.length > 0) {
                return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
            }

           
            const salt = await bcryptjs.genSalt(5); 
            const hashContraseña = await bcryptjs.hash(password, salt);
            const fechaCreacion = new Date().toISOString().split('T')[0];
            const rol = 'usuario'; // Rol por defecto según estándar CORE
            const iconoFinal = icono_perfil ? icono_perfil : "finn";

            const insertQuery = "INSERT INTO users (user, email, password, dc, ciudad, programa_favorito, rol, icono_perfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            connection.query(insertQuery, [user, email, hashContraseña, fechaCreacion, ciudad, programa_favorito, rol, iconoFinal], (insertError, insertResults, insertFields) => {
                if (insertError) {
                    console.error("Error al registrar al usuario:", insertError);
                    return res.status(500).send({ status: "Error", message: "Error interno del servidor o usuario duplicado" });
                }

                res.status(201).send({ status: "ok", message: `Usuario ${user} agregado con éxito` });
            });
        });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error });
    }
}


async function logout(req, res = response) {
    try {
        res.clearCookie("jwt");
        res.status(200).send({ status: "ok", message: "Usuario deslogueado exitosamente" });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error });
    }
}

function crearPublicacion(req, res, next) {
    const { id_usuario, titulo, categoria, texto, imagen_url } = req.body;
  

    if (!id_usuario || !titulo || !categoria || !texto) {
      return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    if (titulo.length < 5 || titulo.length > 100) {
      return res.status(400).send({ status: "Error", message: "El título debe tener entre 5 y 100 caracteres" });
    }
  
  
    const query = "SELECT * FROM publicaciones WHERE titulo = ?";
    connection.query(query, [titulo], (error, results) => {
      if (error) {
        console.error("Error al verificar el título:", error);
        return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
      }
  
      if (results.length > 0) {
        return res.status(400).send({ status: "Error", message: "La publicación ya existe" });
      }
  
      const sqlInsert = `INSERT INTO publicaciones (id_usuario, titulo, fecha, categoria, texto, imagen_url) 
                         VALUES (?, ?, DATE(NOW()), ?, ?, ?)`;
      connection.query(sqlInsert, [id_usuario, titulo, categoria, texto, imagen_url || null], (err, result) => {
        if (err) {
          console.error("Error al crear la publicación:", err);
          return res.status(500).send({ message: "Error al crear la publicación" });
        }
        
        console.log(`Se ha creado una nueva publicación con ID: ${result.insertId}`);
        res.send({ message: "Publicación creada con éxito", id: result.insertId });
      });
    });
  }


function imprimirPublicaciones(callback) {
  const sql = `SELECT 
    p.id,
    u.user AS usuario,
    u.icono_perfil,
    u.programa_favorito,
    p.titulo,
    p.fecha,
    p.categoria,
    p.texto,
    p.imagen_url
  FROM 
    publicaciones p
  INNER JOIN 
    users u ON p.id_usuario = u.id
  ORDER BY p.id DESC;`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error al imprimir las publicaciones:", err);
      return callback({ status: "Error", message: "Error al imprimir las publicaciones" }, null);
    } 
    if (!result || result.length === 0) {
      return callback({ status: "Error", message: "No se encontraron publicaciones" }, null);
    }

    console.log("Publicaciones encontradas:", result);
    return callback(null, { status: "ok", publicaciones: result });
    
  });
}

function eliminarPublicacion(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      
      const query = "SELECT * FROM publicaciones WHERE id = ?";
      connection.query(query, [id], (error, results) => {
        if (error) {
          console.error("Error de verificacion:", error);
          return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
        }
        
        if (results.length === 0) {
          return res.status(404).send({ message: 'Publicación no encontrada' });
        }
        
        const sql = `DELETE FROM publicaciones WHERE id = ?`;
        connection.query(sql, [id], (error, result) => {
          if (error) {
            console.error("Error al eliminar publicación:", error);
            return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
          }
          
          res.send({
            message: `Publicación eliminada con éxito `,
          });
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error al eliminar publicación' });
    }
  }

  function editarPublicacion(req, res) {
    try {
      const { id } = req.params;
      const { titulo, texto, categoria, imagen_url } = req.body;
  
      const query = "SELECT * FROM publicaciones WHERE titulo = ?";
      connection.query(query, [titulo], (error, resultado) => {
        if (error) {
          console.error("Error de verificación:", error);
          return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
        }
   
        if (resultado.length > 0 && resultado[0].id !== parseInt(id)) {
          return res.status(400).send({ message: 'Título ya existe' });
        }
   
        const sql = `UPDATE publicaciones SET titulo = ?, texto = ?, categoria = ?, imagen_url = ? WHERE id = ?`;
        connection.query(sql, [titulo, texto, categoria, imagen_url || null, id], (error, result) => {
          if (error) {
            console.error("Error al actualizar publicación:", error);
            return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
          }
  
          res.send({ message: `Publicación actualizada con éxito` });
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error al actualizar publicación' });
    }
  }

function imprimirUsuarios(callback) {
    const sql = `SELECT U.id, U.user, U.ciudad, U.programa_favorito, U.icono_perfil FROM users U`;
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.error("Error al imprimir los usuarios:", err);
        return callback({ status: "Error", message: "Error  usuarios" }, null);
      } 
      if (!result || result.length === 0) {
        return callback({ status: "Error", message: "No usuarios" }, null);
      }
  
      console.log("Usuarios encontradas:", result);
      return callback(null, { usuarios: result });
    });
  }

  function imprimirComentarios(req, res) {
    try {
        const { id } = req.params;
        
        console.log("id publicacion:", id);
    
        const query = `
          SELECT 
              c.id,
              u.user AS usuario, 
              u.icono_perfil,
              u.programa_favorito,
              c.id_publicacion,
              c.comentario,
              c.fecha
          FROM 
              comentarios c
          INNER JOIN 
              users u ON c.id_usuario = u.id
          WHERE 
              c.id_publicacion = ?;
        `;
        
        connection.query(query, [id], (error, resultado) => {
            if (error) {
                console.error("Error de verificación:", error);
                return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
            }
            
            // Enviar el resultado como respuesta
            res.send({ status: "Success", data: resultado });
        });

    } catch (err) {
        console.error("Error en el try-catch:", err);
        res.status(500).send({ message: 'Error al obtener los comentarios' });
    }
}


function crearComentario(req, res, next) {
  const { id_usuario, id_publicacion,comentario } = req.body;


  if ( !id_usuario || !id_publicacion || !comentario) {
    return res.status(400).send({ status: "Error", message: "faltan datos" });
  }

  if (comentario.trim().length === 0 || comentario.length > 500) {
    return res.status(400).send({ status: "Error", message: "El comentario no puede estar vacío ni superar los 500 caracteres" });
  }

    const sqlInsert = `INSERT INTO comentarios (id_usuario, id_publicacion, comentario,fecha) 
                       VALUES (?, ?, ?, DATE(NOW()))`;
    connection.query(sqlInsert, [id_usuario, id_publicacion, comentario], (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error en la base de datos (Columna 'fecha' probablemente ausente)"});
      }
      res.send({ message: "comentario creado con exito", id: result.insertId });
    });

}

function eliminarComentario(req, res) {
  try {
    const { id } = req.params;
    // console.log(id);
    
    const query = "SELECT * FROM comentarios WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error("Error de verificacion:", error);
        return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
      }
      
      if (results.length === 0) {
        return res.status(404).send({ message: 'Comentario ausente' });
      }
      
      const sql = `DELETE FROM comentarios WHERE id = ?`;
      connection.query(sql, [id], (error, result) => {
        if (error) {
          console.error("Error al eliminar comentario:", error);
          return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
        }
        
        res.send({
          message: `Comentario eliminado exitosamente `,
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error al eliminar comentario' });
  }
}

function imprimirRanking(callback) {
  const sql = `SELECT p.id, p.titulo, COUNT(c.id) AS cantidad_comentarios
FROM publicaciones p
LEFT JOIN comentarios c ON p.id = c.id_publicacion
GROUP BY p.id
ORDER BY cantidad_comentarios DESC
LIMIT 3;`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error al imprimir el ranking:", err);
      return callback({ status: "Error", message: "Error al imprimir el ranking" }, null);
    } 
    if (!result || result.length === 0) {
      return callback({ status: "Error", message: "No se encontraron comentarios" }, null);
    }

    console.log("Ranking:", result);
    return callback(null, { status: "ok", ranking: result });
  });
}

function reaccionar(req, res) {
  const { id_usuario, id_publicacion } = req.body;

  if (!id_usuario || !id_publicacion) {
    return res.status(400).send({ status: "Error", message: "Datos incompletos" });
  }

  // Verificar si ya existe la reacción para eliminarla (toggle) o añadirla
  const checkQuery = "SELECT * FROM reacciones WHERE id_usuario = ? AND id_publicacion = ?";
  connection.query(checkQuery, [id_usuario, id_publicacion], (error, results) => {
    if (error) {
      // Si la tabla no existe, intentamos crearla primero (fallback dinámico)
      const createTable = `CREATE TABLE IF NOT EXISTS reacciones (
        id INT NOT NULL AUTO_INCREMENT,
        id_usuario INT NOT NULL,
        id_publicacion INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (id_usuario) REFERENCES users(id),
        FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id)
      )`;
      connection.query(createTable, () => {
        // Reintentar después de crear la tabla
        return res.status(500).send({ status: "Error", message: "Tabla de reacciones creada, por favor intente de nuevo." });
      });
      return;
    }

    if (results.length > 0) {
      // Eliminar reacción
      const deleteQuery = "DELETE FROM reacciones WHERE id_usuario = ? AND id_publicacion = ?";
      connection.query(deleteQuery, [id_usuario, id_publicacion], () => {
        res.send({ status: "ok", message: "Reacción eliminada", accion: "quitado" });
      });
    } else {
      // Añadir reacción
      const insertQuery = "INSERT INTO reacciones (id_usuario, id_publicacion) VALUES (?, ?)";
      connection.query(insertQuery, [id_usuario, id_publicacion], () => {
        res.send({ status: "ok", message: "Reacción añadida", accion: "puesto" });
      });
    }
  });
}

function obtenerReacciones(req, res) {
  const { id_publicacion } = req.params;
  const sql = "SELECT COUNT(*) as total FROM reacciones WHERE id_publicacion = ?";
  connection.query(sql, [id_publicacion], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send({ status: "ok", total: results[0].total });
  });
}

function obtenerUsuariosReacciones(req, res) {
  const { id_publicacion } = req.params;
  const sql = `
    SELECT u.user as usuario 
    FROM reacciones r
    INNER JOIN users u ON r.id_usuario = u.id
    WHERE r.id_publicacion = ?
  `;
  connection.query(sql, [id_publicacion], (err, results) => {
    if (err) {
      console.error("Error al obtener usuarios que reaccionaron:", err);
      return res.status(500).send({ status: "Error", message: "Error en la base de datos" });
    }
    // Devolvemos un array de strings (nombres de usuarios)
    const usuarios = results.map(row => row.usuario);
    res.send({ status: "ok", usuarios });
  });
}

async function actualizarAvatar(req, res) {
  const { id_usuario, icono_perfil } = req.body;
  if (!id_usuario || !icono_perfil) {
    return res.status(400).send({ status: "Error", message: "Faltan datos para actualizar el avatar" });
  }

  const query = "UPDATE users SET icono_perfil = ? WHERE id = ?";
  connection.query(query, [icono_perfil, id_usuario], (err, result) => {
    if (err) {
      console.error("Error al actualizar avatar:", err);
      return res.status(500).send({ status: "Error", message: "Error interno del servidor al actualizar avatar" });
    }
    res.status(200).send({ status: "ok", message: "Avatar actualizado", icono_perfil });
  });
}

function toggleFavorito(req, res) {
  const { id_usuario, id_publicacion } = req.body;

  if (!id_usuario || !id_publicacion) {
    return res.status(400).send({ status: "Error", message: "Datos incompletos" });
  }

  const checkQuery = "SELECT * FROM favoritos WHERE id_usuario = ? AND id_publicacion = ?";
  connection.query(checkQuery, [id_usuario, id_publicacion], (error, results) => {
    if (error) {
      return res.status(500).send({ status: "Error", message: "Error comprobando favoritos" });
    }

    if (results.length > 0) {
      const deleteQuery = "DELETE FROM favoritos WHERE id_usuario = ? AND id_publicacion = ?";
      connection.query(deleteQuery, [id_usuario, id_publicacion], () => {
        res.send({ status: "ok", message: "Eliminado de favoritos", accion: "quitado" });
      });
    } else {
      const insertQuery = "INSERT INTO favoritos (id_usuario, id_publicacion) VALUES (?, ?)";
      connection.query(insertQuery, [id_usuario, id_publicacion], () => {
        res.send({ status: "ok", message: "Añadido a favoritos", accion: "puesto" });
      });
    }
  });
}

function obtenerFavoritos(req, res) {
  const { id_usuario } = req.params;
  const sql = `
    SELECT p.*, f.id as favorito_id 
    FROM favoritos f
    INNER JOIN publicaciones p ON f.id_publicacion = p.id
    WHERE f.id_usuario = ?
  `;
  connection.query(sql, [id_usuario], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send({ status: "ok", favoritos: results });
  });
}

/* EXPORTACIÓN DE MÉTODOS */
export const methods = {
login,
register,
logout,
crearPublicacion,
imprimirPublicaciones,
imprimirUsuarios,
eliminarPublicacion,
editarPublicacion,
imprimirComentarios,
crearComentario,
eliminarComentario,
imprimirRanking,
reaccionar,
obtenerReacciones,
obtenerUsuariosReacciones,
actualizarAvatar,
toggleFavorito,
obtenerFavoritos

}
