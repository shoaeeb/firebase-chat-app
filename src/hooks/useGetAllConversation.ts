import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebase";
import useAuthUser from "../store/user";

export interface Conversation {
  id: string;
  lastMessage: string;
  timestamp: number;
  participants: string[];
  participantsKey: string;
}

const useGetAllConversation = () => {
  const { user } = useAuthUser();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const getAllConversation = async () => {
      const conversationRef = ref(database, "conversations");
      onValue(conversationRef, (snapshot) => {
        const data = snapshot.val();

        const conv = Object.entries(data || {}).map(
          ([id, value]: [string, any]) => ({
            ...value,
            id,
          })
        ) as Conversation[];
        const userConversations = conv.filter((conversation) =>
          conversation.participants.includes(user?.uid)
        );
        setConversations(userConversations);
      });
    };
    getAllConversation();
  }, [user?.uid]);

  return { conversations };
};

export default useGetAllConversation;
