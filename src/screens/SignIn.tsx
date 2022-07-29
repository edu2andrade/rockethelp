import { useState } from "react";
import auth from "@react-native-firebase/auth";

import { VStack, Heading, Icon, useTheme } from "native-base";
import { Alert } from "react-native";

import Logo from "../assets/logo_primary.svg";
import { Envelope, Key } from "phosphor-react-native";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();

  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert(
        "Hello Stranger!",
        "Could you please inform your e-mail and password?"
      );
    }
    setIsLoading(true);
    // Firebase auth:
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Stranger...", "This e-mail format is not valid.");
        }

        if (error.code === "auth/user-not-found") {
          return Alert.alert("Stranger...", "You don't exist in my database");
        }

        if (error.code === "auth/wrong-password") {
          return Alert.alert("Stranger...", "You don't exist in my database");
        }

        return Alert.alert("Stranger...", "You can't access right now...");
      });
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
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml="4" />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Password"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml="4" />}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="ENTER"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
};
