import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { bun } from "../db/connection";
import { validate } from "../utils/zod-validator";
import { schema, schemaType } from "../schemas/table";
import { sql } from "bun";

const danger = Router();

danger.post("/create-tables", validate(schema), async (req, res, next) => {
  try {
    const body: schemaType = req.body;

    body.tables.map(async (i) => {
      console.log("i:", "i:");
      await bun`
        CREATE TABLE IF NOT EXISTS ${sql(i)} (
          id SERIAL PRIMARY KEY
      )
      `;
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: "Tables created",
    });
  } catch (err: any) {
    next(err);
  }
});

export default danger;
