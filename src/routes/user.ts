import { Router } from "express";
import { db } from "../db/connection";
import { StatusCodes } from "http-status-codes";

const user = Router();

user.get("/all-users", async (_, res, next) => {
  try {
    const users = await db.selectFrom("videos").select("id").execute();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Users fetched succssfully",
      data: users,
    });
  } catch (err: any) {
    next(err);
  }
});

export default user;
