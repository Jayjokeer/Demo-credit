import express from "express";
import AppError from "./errors/error";
import globalErrorHandler from "./errors/error-handler";
import router from "./routes/index.routes";
import './config/config';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);
app.all('/*splat', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404)); 
});
app.use(globalErrorHandler); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
