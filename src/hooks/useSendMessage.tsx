import { ref, push, set, update } from "firebase/database";
import { database } from "../firebase/firebase";
import useCreateConversation from "./useCreateConversation";

const useSendMessage = () => {
  const { checkAndCreateConversation } = useCreateConversation();

  const sendMessage = async (
    authUserId: string,
    otherUserId: string,
    message: string
  ) => {
    if (!authUserId || !otherUserId || !message) return;

    // Ensure the conversation exists or create it
    const conversationId = await checkAndCreateConversation(
      authUserId,
      otherUserId,
      message
    );

    if (!conversationId) {
      console.error("Failed to create or find conversation");
      return;
    }

    // Push the new message to the messages collection
    const messagesRef = ref(database, `messages/${conversationId}`);
    const newMessageRef = push(messagesRef);
    const newMessage = {
      conversationId,
      sender: authUserId,
      message,
      timestamp: Date.now(),
    };
    await set(newMessageRef, newMessage);

    // Update the conversation with the latest message and timestamp
    await update(ref(database, `conversations/${conversationId}`), {
      lastMessage: message,
      timestamp: Date.now(),
    });
  };

  return { sendMessage };
};

export default useSendMessage;
