import mysql from 'mysql';

export const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'typearena',
  password : 'password',
  database : 'sys'
});