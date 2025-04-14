/** ENV */
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const DATABSE = process.env.MYSQL_DATABASE;
export const MYSQL_USER = process.env.MYSQL_USER;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_URL = `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${DB_HOST}:${DB_PORT}/${DATABSE}`;

// DATABASE_URL=postgresql://lunar:1111@postgres/world
/** PATH */
export const COMMON_PROTO_PATH = './src/proto/common.proto';
export const USER_PROTO_PATH = './src/proto/user.proto';
export const NATION_PROTO_PATH = './src/proto/nation.proto';
