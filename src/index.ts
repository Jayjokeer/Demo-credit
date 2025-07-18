import express from "express";
import dotenv from 'dotenv';
import AppError from "./errors/error";
import globalErrorHandler from "./errors/error-handler";
import router from "./routes/index.routes";
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use('/api/v1', router);
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404)); 
});

app.use(globalErrorHandler); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
