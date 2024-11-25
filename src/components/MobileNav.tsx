import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { Flex, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Logout from "./Logout";
import UserProfile from "./UserProfile";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>ChatApp</DrawerHeader>
          <DrawerBody>
            <Flex flexDirection={"column"} gap="5px">
              <UserProfile />
              <Link
                _hover={{
                  bg: "blackAlpha.700",
                }}
                to={"/"}
                color="white"
                bg={"blackAlpha.800"}
                padding="5px"
                as={ReactRouterLink}
              >
                Home
              </Link>
              <Link
                _hover={{
                  bg: "blackAlpha.700",
                }}
                to={"/friends"}
                color="white"
                bg={"blackAlpha.800"}
                padding="5px"
                as={ReactRouterLink}
              >
                Friends
              </Link>
              <Link
                _hover={{
                  bg: "blackAlpha.700",
                }}
                to={"/profile"}
                color="white"
                bg={"blackAlpha.800"}
                padding="5px"
                as={ReactRouterLink}
              >
                Profile
              </Link>

              <Logout />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MobileNav;
