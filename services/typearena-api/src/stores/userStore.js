import uuidv1 from 'uuid/v1';
import { hashSecret, compareSecret } from 'utils/hash';
import User from '../types/user';

class UserStore {
    constructor(sql) {
        this.sql = sql;
    }

    createGuest() {
        return new User({ id: uuidv1(), name: 'Guest' });
    }

    createUser({ email, username, password }) {
        const { hashedSecret, salt } = hashSecret(password);

        return new Promise((resolve, reject) => {
            this.sql.query(
                `INSERT INTO users (id, email, username, password, salt)
                VALUES ('${uuidv1()}', '${email}', '${username}', '${hashedSecret}', '${salt}')`,
                err => {
                    if (err) {
                        return reject(new Error(err));
                    }
                    resolve(true);
                }
            )
        });
    }

    canAuthenticate({ username, passwordAttempt }) {
        return new Promise((resolve, reject) => {
            this.sql.query(
                `SELECT password, salt FROM users WHERE username = '${username}'`,
                (err, rows) => {
                    if (err) {
                        return reject(new Error(err));
                    }
    
                    if (!rows.length) {
                        return reject(new Error(`User ${username} does not exist`));
                    }
    
                    resolve(compareSecret(passwordAttempt, rows[0].password, rows[0].salt))
                }
            )
        });
    }
}

export default UserStore;