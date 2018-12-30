import uuidv1 from 'uuid/v1';

class User {
    constructor(sql) {
        this.sql = sql;
    }

    createUser(username, password) {
        this.sql.query(
            `INSERT INTO users (id, username, password)
            VALUES ('${uuidv1()}', '${username}', '${password}')`,
            (err, rows, fields) => {
                if (err) {
                    throw new Error(err);
                }
                console.log(rows, fields)
            }
        )
    }

    canAuthenticate(username, password) {
        
    }
}

export default User;