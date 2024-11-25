import { Button } from "@chakra-ui/react";
import useLogOut from "../hooks/useLogout";

const Logout = () => {
  const { loading, logout } = useLogOut();
  return (
    <Button
      onClick={logout}
      _hover={{
        bg: "blackAlpha.800",
        color: "white",
      }}
      bg="blackAlpha.700"
      color="white"
    >
      {loading ? "Signing out" : "  Sign Out"}{" "}
    </Button>
  );
};

export default Logout;
