import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import useAuthUser from "../store/user";
import { ChevronDownIcon } from "lucide-react";
import useModal from "../store/modal";

const UserProfile = () => {
  const { user } = useAuthUser((state) => state.user);
  const { open, state } = useModal();
  return (
    <Box>
      <Menu colorScheme="black">
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <Avatar src={user?.profilePicUrl} />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              open(true);
              console.log(state);
            }}
          >
            Upload Picture
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default UserProfile;
