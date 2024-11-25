import { Flex, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

type FormErrorProps = {
  message: string;
};

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return;
  return (
    <Flex
      width="100%"
      border="1px solid red"
      paddingX="5px"
      paddingY="2px"
      gap="2px"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <WarningIcon color="red" bgSize={"5px"} />
      <Text fontSize="2xl" color="red">
        {message}
      </Text>
    </Flex>
  );
};
export default FormError;
