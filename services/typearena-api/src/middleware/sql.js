import mysql from 'mysql';

export const connectionMiddleware = (req, res, next) => {
  res.locals.connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'typearena',
      password : 'password',
      database : 'sys'
  });

  res.locals.connection.connect();
  next();
}