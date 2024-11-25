import { Flex, Text } from "@chakra-ui/react";

interface CardHeaderProps {
  heading: string;
  subHeading: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ heading, subHeading }) => {
  return (
    <Flex flexDirection="column" w="100%">
      <Text fontSize="2xl">{heading}</Text>
      <Text fontSize="sm">{subHeading}</Text>
    </Flex>
  );
};

export default CardHeader;
