import { OpenAI } from 'openai';
import { chatRepository } from '../repositories/chat.repository';
import { string } from 'zod';
//? Conversation Service: Holds business logic for managing conversations

//? Call the repository
const { getLastResponseId, setLastResponseId } = chatRepository;

//? Implementation Details
// Create a new instance of the OpenAI client
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

//Platform agnostic interface for chat responses representing a response from a LLM
interface ChatResponse {
   id: string;
   message: string;
}

//?Public interface:
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      // Call the OpenAI API with the user's prompt and the conversation ID
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         //Send the previous response ID to help the API to continue the conversation from the last response and maintain context
         //If no previous response exists, the API will treat this as a new conversation
         previous_response_id: getLastResponseId(conversationId),
      });

      // Update the last response ID of the current conversation
      setLastResponseId(conversationId, response.id);

      // Map the OpenAI response to the LLM agnostic ChatResponse interface
      return {
         id: response.id,
         message: response.output_text,
      };
   },
};
