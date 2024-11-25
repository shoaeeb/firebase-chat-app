import { Box } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w="100%"
      h="100vh"
      bg="blackAlpha.800"
      color="white"
    >
      <LoginForm />
    </Box>
  );
};
export default LoginPage;
