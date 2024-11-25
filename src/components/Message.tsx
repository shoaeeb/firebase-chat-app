import { Box, Flex, Text } from "@chakra-ui/react";
import { UserType } from "../types/types";
import { useEffect, useRef } from "react";

interface Message {
  sender: string;
  message: string;
  timestamp: number;
}

const Message = ({
  messages,
  user,
}: {
  user: UserType;
  messages: Message[];
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!messageRef.current) return;
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <Box width={"100%"} flexDirection={"row"}>
      {messages.map((message: Message, index: number) => {
        const otherUser = message.sender !== user?.uid;

        return (
          <Flex
            key={index}
            width={"100%"}
            flexDirection={"column"}
            gap={"5px"}
            alignItems={otherUser ? "flex-start" : "flex-end"}
            ref={messageRef}
          >
            <Box
              maxWidth={"50%"}
              padding="10px"
              borderRadius={"10px"}
              backgroundColor={otherUser ? "red.500" : "blackAlpha.800"}
              color="white"
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Text color="white">{message.message}</Text>
                <Text fontSize={"xs"}>
                  {message.message &&
                    new Date(message.timestamp).toLocaleString()}
                </Text>
              </Box>
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
};

export default Message;
