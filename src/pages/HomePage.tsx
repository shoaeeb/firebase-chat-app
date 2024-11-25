import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";

const HomePage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
      <Navbar />
      <Chat />
    </Box>
  );
};
export default HomePage;
