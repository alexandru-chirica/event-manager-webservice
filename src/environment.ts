export default () => ({
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    password: process.env.DATABASE_PASSWORD || 'Secret123456',
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
    user: process.env.DATABASE_USER || 'root',
  },
  isProduction: process.env.NODE_ENV === 'production',
  secret: '2bc67b50f6f03a3d159ba8aace7e4a60131863b7',
  tokenExpirationInSeconds: 2592000,
});
