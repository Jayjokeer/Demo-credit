import { Router } from "express";
import { UserRoute } from "./user.routes";

const router = Router(); 

router.use("/user", UserRoute);
export default router;