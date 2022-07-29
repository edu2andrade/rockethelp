import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { VStack, Text, HStack, useTheme, ScrollView, Box } from "native-base";
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
  ClipboardText,
} from "phosphor-react-native";

import Firestore from "@react-native-firebase/firestore";
import { OrderFirestoreDTO } from "../DTOs/OrderFirestoreDTO";

import { dateFormat } from "../utils/firestoreDateFormat";

import { Header } from "../components/Header";
import { OrdersProps } from "../components/Orders";
import { Loading } from "../components/Loading";
import { CardDetails } from "../components/CardDetails";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrdersProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const { colors } = useTheme();
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const navigation = useNavigation();

  function handleOrderClose() {
    if (!solution) {
      return Alert.alert(
        "Close Order:",
        "Please describe the solution to close this order"
      );
    }

    Firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: Firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Close Order:", "Order successfully closed!");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Close Order:", "Sorry, we can't close this order yet");
      });
  }

  useEffect(() => {
    Firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          status,
          description,
          created_at,
          closed_at,
          solution,
        } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Order" />
      </Box>
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "Closed" : "Open"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Equipment"
          description={`Object Ref: ${order.patrimony}`}
          icon={DesktopTower}
        />
        <CardDetails
          title="Problem description"
          description={order.description}
          icon={ClipboardText}
          footer={`Registered in ${order.when}`}
        />
        <CardDetails
          title="Solution"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Closed in ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              placeholder="Solution description"
              onChangeText={setSolution}
              h={24}
              textAlignVertical="top"
              multiline
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === "open" && (
        <Button title="Close Order" m={5} onPress={handleOrderClose} />
      )}
    </VStack>
  );
}
