import connection from './backend/app/controllers/db.js';

connection.query("DESCRIBE users;", (err, results) => {
  if (err) console.error(err);
  else console.log(results);
  process.exit();
});
