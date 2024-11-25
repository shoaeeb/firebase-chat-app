import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { User } from "../types/types";

const UserChat = ({
  user,
  setSelectedChat,
}: {
  user: User;
  setSelectedChat: React.Dispatch<
    React.SetStateAction<{
      conversationId: string;
      userId: string;
    }>
  >;
}) => {
  return (
    <Box
      onClick={() => {
        setSelectedChat({
          conversationId: user?.item?.id || "",
          userId: user?.uid.toString(),
        });
      }}
      display={"flex"}
      gap={"5px"}
      border={"1px solid black"}
    >
      <Box position={"relative"}>
        <Avatar src={user?.profilePicUrl} name={user.username} />
        {user?.onlineStatus && (
          <Box
            position={"absolute"}
            bottom={"5px"}
            width={"11px"}
            height={"11px"}
            borderRadius={"50%"}
            backgroundColor={"green.500"}
          />
        )}
      </Box>

      <Flex width="100%" flexDirection={"column"} gap="2px">
        <Text fontWeight={"bold"} fontSize={"1xl"}>
          {user?.username}
        </Text>
        <Text fontWeight={"semibold"} fontSize={"1xl"}>
          lastMessage: {user?.item?.lastMessage || ""}
        </Text>
      </Flex>
    </Box>
  );
};

export default UserChat;
