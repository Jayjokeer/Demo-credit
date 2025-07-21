import { Router } from "express";
import { UserRoute } from "./user.routes";
import { TransactionRoute } from "./transactions.routes";

const router = Router(); 

router.use("/user", UserRoute);
router.use("/transaction", TransactionRoute);
export default router;
