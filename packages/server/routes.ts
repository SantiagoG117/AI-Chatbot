import { chatController } from './controllers/chat.controller';
//? Build the router
import express from 'express';
const router = express.Router();

//? Route Handlers
router.post('/api/chat', chatController.sendChatMessage); //At runtime express sends the req and res values to sendChatMessage

export default router;
