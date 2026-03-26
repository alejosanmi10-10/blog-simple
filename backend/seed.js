import mysql from 'mysql2/promise';

async function seed() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alejosan1234',
    database: 'cartoonnetwork'
  });

  const [users] = await connection.execute('SELECT id FROM users LIMIT 1');
  let id_usuario = 1;
  if(users.length > 0) id_usuario = users[0].id;

  const posts = [
    [id_usuario, 'El Secreto de la Dulce Princesa', 'Hora de Aventura', '¿Sabías que la Dulce Princesa en realidad tiene más de 800 años? Ella misma creó todo el Dulce Reino a partir de biomasa mutante.', new Date()],
    [id_usuario, 'El misterio de Los Padrinos Mágicos', 'Clásicos', 'Aunque originalmente era de otra cadena, Cartoon Network emitió el programa en varios países y sus creadores fueron pioneros en The Powerpuff Girls y Dexter.', new Date()],
    [id_usuario, 'Los mensajes ocultos en Coraje', 'Curiosidades CN', 'La computadora de Coraje a menudo da consejos sarcásticos, pero en la versión original en inglés tiene un acento británico muy marcado que lo hace sonar excepcionalmente engreído.', new Date()],
    [id_usuario, 'La censura secreta de Dexter', 'El Laboratorio de Dexter', 'Existe un episodio censurado donde Dexter crea una máquina para quitarle la rudeza a DeeDee, pero terminan creando clones malvados que maldicen todo el tiempo.', new Date()],
    [id_usuario, 'El pasado oscuro de Rigby', 'Un Show Más', 'A diferencia de Mordecai que fue a la escuela de arte (donde reprobó miserablemente), Rigby abandonó la preparatoria y ni siquiera tramitó su certificado, lo que explica muchas de sus inseguridades.', new Date()]
  ];

  for (const post of posts) {
    try {
      await connection.execute(
        'INSERT INTO publicaciones (id_usuario, titulo, categoria, texto, fecha) VALUES (?, ?, ?, ?, ?)',
        post
      );
    } catch (err) {
      if (err.code === 'ER_BAD_FIELD_ERROR') {
        await connection.execute(
          'INSERT INTO publicaciones (id_usuario, titulo, categoria, texto) VALUES (?, ?, ?, ?)',
          post.slice(0, 4)
        );
      } else {
        console.error("Error inserting post:", err);
      }
    }
  }

  console.log('¡Seeding completo!');
  await connection.end();
}

seed().catch(console.error);
