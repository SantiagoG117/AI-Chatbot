import { chatController } from './controllers/chat.controller';
import express from 'express';
import router from './routes';

//? Load environment variables
import dotenv from 'dotenv';
dotenv.config();

//? Build the server
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
//Middleware function to automatically parse json objects from the request body
app.use(express.json());

//?Routers
app.use(router);
