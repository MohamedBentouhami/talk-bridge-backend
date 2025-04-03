declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            PORT: string;
            MONGO_URI: string;
            JWT_SECRET: string;
            JWT_ISSUER: string;
            JWT_AUDIENCE: string;
            CLIENT_URL: string;
        }
    }
}

export default global