import {
  ref,
  push,
  set,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import { database } from "../firebase/firebase";
import { useState } from "react";

const useCreateConversation = () => {
  const [conversationId, setConversationId] = useState<string | null>(null);

  const checkAndCreateConversation = async (
    authUser: string,
    userId: string,
    lastMessage: string
  ): Promise<string | null> => {
    const participantsKey = [authUser, userId].sort().join("_");
    const conversationRef = ref(database, "conversations");
    const conversationQuery = query(
      conversationRef,
      orderByChild("participantsKey"),
      equalTo(participantsKey)
    );
    const snapshot = await get(conversationQuery);

    if (snapshot.exists()) {
      const existingConversationId = Object.keys(snapshot.val())[0];
      setConversationId(existingConversationId);
      return existingConversationId;
    } else {
      const newConversationRef = push(conversationRef);
      const newConversationId = newConversationRef.key!;
      await set(newConversationRef, {
        participants: [authUser, userId],
        lastMessage,
        timestamp: Date.now(),
        participantsKey,
      });
      setConversationId(newConversationId);
      return newConversationId;
    }
  };

  return { conversationId, checkAndCreateConversation };
};

export default useCreateConversation;
