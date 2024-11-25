import { Box } from "@chakra-ui/react";
import { useState } from "react";
import useGetAllUser from "../hooks/useGetAllUser";
import useAuthUser from "../store/user";
import useGetAllConversation from "../hooks/useGetAllConversation";
import useGetMessages from "../hooks/useGetMessages";

import UserChat from "./UserChat";
import MessageComponent from "./Message";
import MessageInput from "./MessageInput";
import { UserType } from "../types/types";

const Chat = () => {
  const { users } = useGetAllUser();
  const { user } = useAuthUser();

  // Filter own user
  const filteredUser = users?.filter(
    (User: UserType) => User?.uid !== user.uid
  );

  const [selectedChat, setSelectedChat] = useState<{
    conversationId: string;
    userId: string;
  }>({
    conversationId: "",
    userId: "",
  });

  const { conversations } = useGetAllConversation();
  const Conversations = filteredUser?.map((user: UserType) => {
    if (
      conversations?.find((conv: any) => conv.participants.includes(user?.uid))
    ) {
      const item = conversations.find((conv: any) =>
        conv.participants.includes(user?.uid)
      );
      return {
        ...user,
        item,
      };
    } else {
      return { ...user };
    }
  });

  const { messages, setMessages } = useGetMessages(selectedChat?.userId);
  console.log(selectedChat);

  return (
    <Box width="100%" flex="1" display="flex" height={"calc(100% - 250px)"}>
      <Box
        width={"25%"}
        borderRight={"1px solid black"}
        display={"flex"}
        flexDirection={"column"}
        gap={"2px"}
        overflowY={"scroll"}
        height={"100vh"}
        maxHeight={"100vh - 260px"}
      >
        {Conversations?.map((user: any, index: number) => (
          <UserChat setSelectedChat={setSelectedChat} user={user} key={index} />
        ))}
      </Box>
      <Box
        width={"75%"}
        flexDirection={"column"}
        gap={"2px"}
        overflowX={"hidden"}
        borderLeft={"1px solid black"}
        paddingX={"5px"}
      >
        {selectedChat.userId !== "" && (
          <MessageComponent user={user} messages={messages} />
        )}
        {selectedChat.userId !== "" && (
          <MessageInput selectedChat={selectedChat} />
        )}
      </Box>
    </Box>
  );
};

export default Chat;
