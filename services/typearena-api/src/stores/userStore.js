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

    canAuthenticate({ email, username, passwordAttempt }) {
        const withEmail = !!email;
        const query = `SELECT password, salt FROM users WHERE ${withEmail ? `email = '${email}'` : `username = '${username}'`}`;
        return new Promise((resolve, reject) => {
            this.sql.query(
                query,
                (err, rows) => {
                    if (err) {
                        return reject(new Error(err));
                    }
    
                    if (!rows.length) {
                        return reject(new Error(`${withEmail ? email : username} not found`));
                    }
    
                    resolve(compareSecret(passwordAttempt, rows[0].password, rows[0].salt))
                }
            )
        });
    }
}

export default UserStore;