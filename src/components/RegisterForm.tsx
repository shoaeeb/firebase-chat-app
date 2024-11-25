import { useState } from "react";
import CardWrapper from "./CardWrapper";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useSignUpWithEmailPassword from "../hooks/useSignUpWithEmailAndPassword";

const RegisterForm = () => {
  const [value, setValue] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: "", password: "", email: "" });

  const { signUp, loading } = useSignUpWithEmailPassword();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(value);
    await signUp(value);
  };

  return (
    <CardWrapper heading={"Register"} subHeading={"Create an Account Here"}>
      <form onSubmit={onSubmit}>
        <Flex
          flexDirection={"column"}
          justifyContent="center"
          gap={"6px"}
          h="100%"
        >
          <Input
            onChange={(e) =>
              setValue({
                ...value,
                username: e.target.value,
              })
            }
            value={value.username}
            placeholder="username"
            type="text"
          />
          <Input
            onChange={(e) =>
              setValue({
                ...value,
                email: e.target.value,
              })
            }
            value={value.email}
            placeholder="email"
            type="email"
          />
          <Input
            onChange={(e) =>
              setValue({
                ...value,
                password: e.target.value,
              })
            }
            value={value.password}
            placeholder="password"
            type="password"
          />
          <Button
            _hover={{
              bg: "blackAlpha.700",
            }}
            disabled={loading}
            bg="blackAlpha.800"
            color="white"
            padding="2px"
            type="submit"
            _disabled={{
              bg: "blackAlpha.700",
            }}
          >
            Create Account
          </Button>
        </Flex>
      </form>
      <Link
        style={{
          textDecoration: "underline",
        }}
        to="/login"
      >
        Already have an account{" "}
      </Link>
    </CardWrapper>
  );
};

export default RegisterForm;
