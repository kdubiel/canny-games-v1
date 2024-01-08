export interface AppConfig {
  isDevelopment: boolean;
  port: number;
  mongo: {
    dbName: string;
    url: string;
  };
  redis: {
    host: string;
    port: number;
  };
  jwt: {
    accessTokenSecret: string;
    accessTokenCookieName: string;
    accessTokenMaxAge: number;
    refreshTokenSecret: string;
    refreshTokenCookieName: string;
    refreshTokenMaxAge: number;
  };
}

export default (): AppConfig => ({
  isDevelopment: process.env.NODE_ENV === 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  mongo: {
    dbName: process.env.DB_NAME,
    url: process.env.DB_URL,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  jwt: {
    accessTokenSecret: process.env.JWT_SECRET,
    accessTokenCookieName: 'access_token',
    accessTokenMaxAge: 1000 * 60 * 10, // 10 minutes
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    refreshTokenCookieName: 'refresh_token',
    refreshTokenMaxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
});
