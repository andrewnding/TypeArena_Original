import uuidv1 from 'uuid/v1';
import { hashSecret, compareSecret } from 'utils/hash';
import User from 'types/user';

class UserStore {
    constructor(sql) {
        this.sql = sql;
    }

    createGuest() {
        return new User({ id: uuidv1(), isGuest: true });
    }

    createUser({ email, username, password }) {
        const { hashedSecret, salt } = hashSecret(password);

        return new Promise((resolve, reject) => {
            const id = uuidv1();

            this.sql.query(
                `INSERT INTO users (id, email, username, password, salt)
                VALUES ('${id}', '${email}', '${username}', '${hashedSecret}', '${salt}')`,
                err => {
                    if (err) {
                        return reject(new Error(err));
                    }
                    resolve(new User({ id, email, username }));
                }
            )
        });
    }

    findOne({ id, email, username }) {
        let query;

        return new Promise((resolve, reject) => {
            if (id) {
                query = `SELECT * from users WHERE id = '${id}'`;
            } else if (email) {
                query = `SELECT * from users WHERE email = '${email}'`;
            } else if (username) {
                query = `SELECT * from users WHERE username = '${username}'`;
            } else {
                return reject(new Error('Must provide id, email, or username'));
            }

            this.sql.query(
                query,
                (err, rows) => {
                    if (err) {
                        return reject(new Error(err));
                    }
    
                    if (!rows.length) {
                        return reject(new Error(`User not found`));
                    }
    
                    resolve(new User({
                        id: rows[0].id,
                        email: rows[0].email,
                        username: rows[0].username,
                        isGuest: rows[0].isGuest,
                    }))
                }
            )
        })
    }

    canAuthenticate({ email, username, passwordAttempt }) {
        let query;

        return new Promise((resolve, reject) => {
            if (email) {
                query = `SELECT password, salt FROM users WHERE email = '${email}'`;
            } else if (username) {
                query = `SELECT password, salt FROM users WHERE username = '${username}'`;
            } else {
                return reject(new Error('Must provide email or username'));
            }

            this.sql.query(
                query,
                (err, rows) => {
                    if (err) {
                        return reject(new Error(err));
                    }
    
                    if (!rows.length) {
                        return reject(new Error('User not found'));
                    }
    
                    resolve(compareSecret(passwordAttempt, rows[0].password, rows[0].salt))
                }
            )
        });
    }
}

export default UserStore;