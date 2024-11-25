import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../store/toast";

function Toast({
  message,
  status,
}: {
  message: string;
  status: "Error" | "Success" | "";
}) {
  const [open, setOpen] = useState(true);
  const { showToast } = useShowToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      showToast("", "");
      setOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, status]);

  if (open && !message) {
    return null;
  }

  if (!open && !message && !status) {
    return null;
  }

  console.log(message);

  return (
    <Box
      px={"25px"}
      py={"15px"}
      color={"white"}
      bg={`${status === "Error" ? "red.600" : "green.600"} `}
      position={"absolute"}
      top={"4"}
      left={"5"}
    >
      <Text size="lg">{message}</Text>
    </Box>
  );
}

export default Toast;
