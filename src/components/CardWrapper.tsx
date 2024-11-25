import { Card, Flex, Text } from "@chakra-ui/react";
import CardHeader from "./CardHeader";
import { FcGoogle } from "react-icons/fc";
import useLoginWithGoogle from "../hooks/useLoginWithGoogle";

interface CardWrapperProps {
  children?: React.ReactNode;
  showSocial?: boolean;
  heading: string;
  subHeading: string;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  heading,
  subHeading,
  children,
  showSocial,
}) => {
  const { loginWithGoogle } = useLoginWithGoogle();
  return (
    <Card
      w={"450px"}
      h={"50%"}
      paddingTop={"10px"}
      paddingBottom="10px"
      paddingRight={"5px"}
      paddingLeft={"5px"}
      display="flex"
      flexDirection={"column"}
    >
      <CardHeader heading={heading} subHeading={subHeading} />
      {children}
      {showSocial && (
        <Flex
          paddingRight={"2px"}
          marginTop="10px"
          border="1px solid gray"
          paddingLeft="2px"
          paddingTop="5px"
          paddingBottom="5px"
          gap="2px"
          textAlign="center"
          onClick={loginWithGoogle}
        >
          <FcGoogle size="25px" />
          <Text size="2xl">Continue With Google</Text>
        </Flex>
      )}
    </Card>
  );
};

export default CardWrapper;
