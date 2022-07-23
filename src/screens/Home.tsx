import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from "native-base";

import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import Logo from "../assets/logo_secondary.svg";
import { Filter } from "../components/Filter";
import { useState } from "react";
import { Orders, OrdersProps } from "../components/Orders";
import { Button } from "../components/Button";

export function Home() {
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<OrdersProps[]>([
    {
      id: "789",
      patrimony: "123456",
      when: "22/07/2022 às 17:12",
      status: "open",
    },
  ]);

  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<Feather name="log-out" size={20} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Entries</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="Proccessing"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="closed"
            title="Done"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Orders data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <IconButton
                icon={
                  <Feather
                    name="message-circle"
                    size={40}
                    color={colors.gray[300]}
                  />
                }
              />
              <Text color="gray.300" fontSize="xl" mt={4} textAlign="center">
                You don't have {"\n"}
                any {statusSelected === "open" ? "open" : "closed"} calls
              </Text>
            </Center>
          )}
        ></FlatList>

        <Button title="New entry" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
