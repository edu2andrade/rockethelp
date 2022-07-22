import { VStack, Box, Heading, Icon } from "native-base";
import Logo from "../assets/logo_primary.svg";
import { FontAwesome } from "@expo/vector-icons";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

// Components starts with capital letters
export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log(email, password);
  };
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={"32"}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Access your account
      </Heading>
      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={<Icon as={<FontAwesome name="envelope" />} ml="4" />}
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Password"
        InputLeftElement={<Icon as={<FontAwesome name="key" />} ml="4" />}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="ENTER" w="full" onPress={handleSignIn} />
    </VStack>
  );
};
