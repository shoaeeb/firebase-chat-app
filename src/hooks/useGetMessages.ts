import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import useGetAllConversation from "./useGetAllConversation";
import useAuthUser from "../store/user";
export interface Message {
  id: string;
  message: string;
  sender: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  lastMessage: string;
  timestamp: number;
  participants: string[];
  participantsKey: string;
}

function useGetMessages(userId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { conversations } = useGetAllConversation();
  const { user } = useAuthUser();

  useEffect(() => {
    const participantsKey = [user?.uid, userId].sort().join("_");
    const conversationId = conversations?.find((conv: any) =>
      conv.participantsKey.includes(participantsKey)
    )?.id;

    const getMessages = async () => {
      setMessages([]);
      if (!conversationId) return;
      const messagesRef = ref(database, `messages/${conversationId}`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const messages = Object.entries(data || {}).map(
          ([id, value]: [string, any]) => ({
            ...value,
            id,
          })
        ) as Message[];
        console.log("messages", messages);
        setMessages(messages);
      });
    };
    getMessages();
  }, [userId]);
  return { messages, setMessages };
}

export default useGetMessages;
