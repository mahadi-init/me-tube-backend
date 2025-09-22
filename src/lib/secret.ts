import "dotenv/config";

const secrets = {
  port: (process.env.PORT as string) || 7000,
  jwt_secret: process.env.JWT_SECRET as string,
  postgres: process.env.DATABASE_URL as string,
};

export default secrets;
