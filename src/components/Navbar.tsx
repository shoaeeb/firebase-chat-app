import {
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  return (
    <Box width={"100%"} bg="blackAlpha.800" paddingX={"25px"} paddingY={"5px"}>
      {isLargeScreen ? (
        <Flex width={"100%"} alignItems={"center"} justifyContent={"center"}>
          <NavLinks />
          <UserProfile />
        </Flex>
      ) : (
        <>
          <IconButton
            aria-label=""
            icon={<HamburgerIcon />}
            colorScheme="blackAlpha.700"
            onClick={onOpen}
          />
          <MobileNav isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </Box>
  );
};
export default Navbar;
