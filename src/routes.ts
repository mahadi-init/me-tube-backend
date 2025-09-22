import { Router } from "express";
import devOnly from "./routes/dev-only";
import user from "./routes/user";

const router = Router();

router.use("/dev-only", devOnly);
router.use("/users", user);

// Handle not found
router.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default router;
