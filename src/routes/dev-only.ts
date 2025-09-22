import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { bun } from "../db/connection";
import { validate } from "../utils/zod-validator";
import { schema, schemaType } from "../schemas/table";
import { sql } from "bun";

const devOnly = Router();

devOnly.get("/database-status", async (_, res, next) => {
  try {
    const status = await bun`SELECT version();`;
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successful",
      data: status,
    });
  } catch (err: any) {
    next(err);
  }
});

devOnly.get("/all-tables", async (_, res, next) => {
  try {
    const tables = await bun`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
    `;

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successful",
      data: tables,
    });
  } catch (err: any) {
    next(err);
  }
});

devOnly.post("/create-tables", validate(schema), async (req, res, next) => {
  try {
    const body: schemaType = req.body;

    body.tables.map(async (i) => {
      await bun`
        CREATE TABLE IF NOT EXISTS ${sql(i)} (
        id SERIAL PRIMARY KEY
      )`;
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Tables created",
    });
  } catch (err: any) {
    next(err);
  }
});

devOnly.delete("/delete-tables", validate(schema), async (req, res, next) => {
  try {
    const body: schemaType = req.body;

    body.tables.map(async (i) => {
      await bun`
        DROP TABLE IF EXISTS ${sql(i)}
      `;
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Tables Deleted",
    });
  } catch (err: any) {
    next(err);
  }
});

export default devOnly;
