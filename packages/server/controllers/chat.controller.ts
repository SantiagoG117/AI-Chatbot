import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.service';

/* 
    ? Controller:
    Gateway of the application:
        1. Validates the request
        2. It handles incoming http requests forwards it to the appropriate service.
        3. Returns the response back to the client
*/

//? Implementation details:
// Input validation: Shape of the incoming request data
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long (max 1000 characters'),
   conversationId: z.uuid(),
});

//? Public interface
export const chatController = {
   async sendChatMessage(req: Request, res: Response) {
      // Validate incoming request
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         return res.status(400).json({ errors: parseResult.error.format() });
      }

      //Send the prompt to OpenAI
      try {
         //Handles the request and forwards it to the appropriate service.
         const { prompt, conversationId } = req.body;

         //Call the service to send the message to OpenAI
         const response = await chatService.sendMessage(prompt, conversationId);

         //Return a JSON object with the response from OpenAI to the client
         return res.json({ message: response.message });
      } catch {
         res.status(500).json({ error: 'Internal Server Error' });
      }
   },
};
