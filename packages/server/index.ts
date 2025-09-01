import express from 'express';
import type { Request, Response } from 'express';
import OpenAI from 'openai';
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

//? Create a new instance of the OpenAI client
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

app.post('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the API! :)' });
});

//? Conversation history tracker:Mutliple users can have multiple conversations
// Map conversation ID to last response ID in that conversation
const conversations = new Map<string, string>();

//? Endpoints

app.post('/api/chat', async (req: Request, res: Response) => {
   //Get the user's prompt from the request
   const { prompt, conversationId } = req.body;

   //Send the prompt to Open AI:
   const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
      //Send the previous response ID to help the API to continue the conversation from the last response and maintain context
      //If no previous response exists, the API will treat this as a new conversation
      previous_response_id: conversations.get(conversationId),
   });

   //Update the last response Id of the current conversation
   conversations.set(conversationId, response.id);

   //Return a JSON object to the client
   return res.json({ message: response.output_text });
});
