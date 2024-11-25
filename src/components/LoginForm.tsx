import { Button, Flex, Input } from "@chakra-ui/react";
import CardWrapper from "./CardWrapper";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLoginWithEmailAndPassword from "../hooks/useLoginWithEmailAndPassword";

const LoginForm = () => {
  const [value, setValue] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const { loading, signIn } = useLoginWithEmailAndPassword();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(value);
    signIn(value);
  };

  return (
    <CardWrapper
      heading={"Welcome Back!"}
      subHeading={"Login to your account!"}
    >
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
                email: e.target.value,
              })
            }
            value={value.email}
            placeholder="johndoe@gmail.com"
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
            _disabled={{
              bg: "blackAlpha.700",
            }}
            _hover={{
              bg: "blackAlpha.700",
            }}
            bg="blackAlpha.800"
            color="white"
            padding="2px"
            type="submit"
            disabled={loading}
          >
            Login
          </Button>
        </Flex>
      </form>
      <Link
        style={{
          textDecoration: "underline",
        }}
        to="/register"
      >
        Don't have an account?{" "}
      </Link>
    </CardWrapper>
  );
};

export default LoginForm;
