import { Box } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
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
      <RegisterForm />
    </Box>
  );
};

export default Register;
