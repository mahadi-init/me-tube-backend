import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

//middleware
app.use(
  cors({
    origin: "*",
    credentials: false,
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "Authorization",
      "Accept",
      "X-Requested-With",
      "Access-Control-Allow-Origin",
    ],
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan(":method :url"));

export default app;
