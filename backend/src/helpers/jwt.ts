const jwt = require('jsonwebtoken');
const generateJWT = (
    _id: string,
    login: string = '',
    expiresIn = process.env.EXPIRES_IN,
    jwtSecret = process.env.JWT_SECRET
) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id,
            login
        };
        jwt.sign(
            payload,
            jwtSecret,
            {
                expiresIn: expiresIn,
            },
            (err: string, token: string) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        )
    });
};
export default generateJWT;