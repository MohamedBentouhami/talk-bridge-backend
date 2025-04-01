import jwt, { SignOptions } from "jsonwebtoken"

export function generateJWT(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;
        const options: SignOptions = {
            algorithm: 'HS512',
            expiresIn: '10h',
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE
        }
        const data = {
            userId
        }
        jwt.sign(data, JWT_SECRET, options, (error, token) => {
            if (error || !token) {
                reject(new Error("Token not generated"));
                return;
            }
            resolve(token);
        });
    })
}

export function decodeJWT(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;
        const options: SignOptions = {
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE
        }
        jwt.verify(token, JWT_SECRET, options, (error: any, data : any) => {
            if(error){
                reject(error);
                return;
            }
            resolve(data.userId);
        })

    })
}