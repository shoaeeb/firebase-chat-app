import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import useSendMessage from "../hooks/useSendMessage";
import useAuthUser from "../store/user";

interface MessageInputProps {
  selectedChat: {
    conversationId: string;
    userId: string;
  };
}

const MessageInput: React.FC<MessageInputProps> = ({ selectedChat }) => {
  const { user } = useAuthUser();
  const { sendMessage } = useSendMessage();
  const [text, setText] = useState<string>("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;

    await sendMessage(user?.uid || "", selectedChat.userId, text);
    setText(""); // Clear the input
  };

  return (
    <form onSubmit={handleSendMessage}>
      <Box
        position={"fixed"}
        bottom={"0"}
        display={"flex"}
        width={"100%"}
        gap={"5px"}
      >
        <Input
          type="text"
          placeholder="Type your message here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          width={"50%"}
          padding={"5px"}
          border={"1px solid black"}
        />
        <Button type="submit">Send</Button>
      </Box>
    </form>
  );
};

export default MessageInput;
