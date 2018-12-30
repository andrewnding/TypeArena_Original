import crypto from 'crypto';

const ITERATIONS = 10000;
const KEYLEN = 64;

export const hashSecret = secret => {
    const salt = crypto.randomBytes(128).toString('hex');
    const hashedSecret = crypto.pbkdf2Sync(secret, salt, ITERATIONS, KEYLEN, 'sha512').toString('hex');
    
    return {
        hashedSecret,
        salt
    }
}

export const compareSecret = (secretAttempt, savedSecret, salt) => {
    const hashedSecret = crypto.pbkdf2Sync(secretAttempt, salt, ITERATIONS, KEYLEN, 'sha512').toString('hex');
        
    return savedSecret === hashedSecret;
}
