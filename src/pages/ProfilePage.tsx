import { Box, Flex, Text } from "@chakra-ui/react";
import useGetUserDetails from "../hooks/useGetUserDetails";
import UserForm, { UserFormType } from "../components/UserForm";
import Navbar from "../components/Navbar";
import useUpdateUser from "../hooks/useUpdateUser";

const ProfilePage = () => {
  const { userData: user } = useGetUserDetails();
  const { loading: updatingUser, updateUser } = useUpdateUser();
  const onSubmit = (data: UserFormType) => {
    updateUser(data);
  };
  return (
    <Box height={"100vh"} width={"100%"} bg={"blackAlpha.800"} color="white">
      <Navbar />

      <Flex
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
      >
        <Box height={"300px"} width={"600px"} bg={"white"} paddingX="5px">
          <Text textAlign={"center"} fontSize={"3xl"} color="black">
            User Profile
          </Text>
          <UserForm loading={updatingUser} onSubmit={onSubmit} user={user} />
        </Box>
      </Flex>
    </Box>
  );
};
export default ProfilePage;
