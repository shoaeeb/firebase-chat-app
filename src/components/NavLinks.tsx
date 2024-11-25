import { Flex, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Logout from "./Logout";

const NavLinks = () => {
  return (
    <Flex justifyContent={"center"} width={"100%"}>
      <Link
        _hover={{
          color: "white",
          bg: "blackAlpha.700",
        }}
        color="white"
        padding={"5px"}
        as={ReactRouterLink}
        to="/"
      >
        Home
      </Link>
      <Link
        _hover={{
          color: "white",
          bg: "blackAlpha.700",
        }}
        color="white"
        padding={"5px"}
        as={ReactRouterLink}
        to="/friends"
      >
        Friends
      </Link>
      <Link
        _hover={{
          color: "white",
          bg: "blackAlpha.700",
        }}
        color="white"
        padding={"5px"}
        as={ReactRouterLink}
        to="/profile"
      >
        Profile
      </Link>

      <Logout />
    </Flex>
  );
};

export default NavLinks;
