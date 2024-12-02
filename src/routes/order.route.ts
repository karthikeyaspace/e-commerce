import { Router } from "express";

const router = Router();

router.get("/:id");
router.post("/");
router.put("/:id");
router.get("/recent/:days");
router.get("/user/:id");
router.get("/product/:id");

export default router;
