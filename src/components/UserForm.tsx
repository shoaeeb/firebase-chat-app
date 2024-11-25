import { Box, Button, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

type UserFormProps = {
  onSubmit: (data: UserFormType) => void;
  user?: any;
  loading: boolean;
};

const UserFormSchema = z.object({
  username: z.string().min(1, "This field is required"),
  password: z.string().min(1, "This field is required"),
  bio: z.string().min(1, "This field is required"),
});

export type UserFormType = z.infer<typeof UserFormSchema>;
const UserForm: React.FC<UserFormProps> = ({ onSubmit, user, loading }) => {
  const { handleSubmit, register, reset } = useForm<UserFormType>({
    resolver: zodResolver(UserFormSchema),
  });

  useEffect(() => {
    const userData = {
      username: user?.username,
      password: user?.password,
      bio: user?.bio,
    };
    reset(userData);
  }, [user?.uid, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display={"flex"} flexDirection={"column"} gap="5px">
        <Input
          type="text"
          placeholder="username"
          border="1px solid black"
          paddingX={"5px"}
          paddingY="2px"
          disabled
          {...register("username", {
            required: "This field is required",
          })}
          color="black"
        />
        <br />
        <Input
          border="1px solid black"
          paddingX="5px"
          paddingY="2px"
          disabled
          type="password"
          placeholder="password"
          {...register("password", {
            required: "This field is required",
          })}
          color="black"
        />
        <br />
        <Input
          type="text"
          paddingX="5px"
          paddingY="2px"
          placeholder="Bio"
          border="1px solid black"
          {...register("bio", {
            required: "This field is required",
          })}
          color="black"
          disabled={loading}
        />
        <Button
          bg="black"
          color="white"
          paddingX="5px"
          paddingY="2px"
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </Box>
    </form>
  );
};

export default UserForm;
