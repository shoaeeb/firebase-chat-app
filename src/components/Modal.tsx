import { Box, Text } from "@chakra-ui/icons";
import { useRef } from "react";
import useModal from "../store/modal";
import { Button } from "@chakra-ui/react";
import usePreviewImg from "../hooks/usePreviewImg";
import { useUpdateProfilePicture } from "../hooks/useUpdateProfilePicture";

const Modal = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { state, open } = useModal();
  const { selectedFile, handleImageChange } = usePreviewImg();
  const { updateProfilePicture } = useUpdateProfilePicture();

  if (!state) return;

  return (
    <Box
      position={"absolute"}
      top={"50%"}
      left={"50%"}
      backgroundColor={"blackAlpha.800"}
      paddingX={"100px"}
      paddingY={"50px"}
    >
      <Box width={"100%"}>
        <Text fontSize={"2xl"} color="white" textAlign="center">
          Upload Profile Picture
        </Text>
        <Box>
          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={(e) => handleImageChange(e)}
          />
          <Text
            onClick={() => fileRef.current?.click()}
            fontSize={"3xl"}
            color="white"
            textAlign={"center"}
            cursor={"pointer"}
          >
            Upload Picture
          </Text>
        </Box>
        <Box display={"flex"} gap={"10px"}>
          <Button
            onClick={() => {
              open(false);
            }}
            backgroundColor={"white"}
            color="black"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (!selectedFile) return;
              await updateProfilePicture(selectedFile?.toString());
            }}
            backgroundColor={"red.500"}
            color="white"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default Modal;
