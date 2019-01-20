class User {
    constructor({ id, email, username, isGuest=false }) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.isGuest = isGuest;
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            isGuest: this.isGuest,
        };
    }
}

export default User;