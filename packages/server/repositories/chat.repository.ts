/* 
   ? Repository:
   Use for data storage and retrieval. Data can be stored in memory, a database, or other persistent storage solutions.
   In this case, we are using an in-memory store (a simple Map) to keep track of the last response ID for each conversation.
   In a real-world application, this could be replaced with a database or other persistent storage solution.
*/

//? Implementation details
// Conversation history tracker: Multiple users can have multiple conversations. Map conversation ID to last response ID in that conversation
const conversations = new Map<string, string>();

//?Public interface
export const chatRepository = {
   getLastResponseId(conversationId: string) {
      return conversations.get(conversationId);
   },
   setLastResponseId(conversationId: string, responseId: string) {
      conversations.set(conversationId, responseId);
   },
};
