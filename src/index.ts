import express from "express";
// import { router } from './routes';
// import { errorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
// app.use('/api', router);
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
