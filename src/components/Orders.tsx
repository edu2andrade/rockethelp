import {
  Box,
  Circle,
  HStack,
  Text,
  useTheme,
  VStack,
  Pressable,
  IPressableProps,
} from "native-base";
import { CircleWavyCheck, Hourglass, Clock } from "phosphor-react-native";

export type OrdersProps = {
  id: string;
  patrimony: string;
  when: string;
  status: "open" | "closed";
};

type Props = IPressableProps & {
  data: OrdersProps;
};

export function Orders({ data, ...rest }: Props) {
  const { colors } = useTheme();

  const statusColor =
    data.status === "open" ? colors.secondary[700] : colors.green[300];

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor} />
        <VStack flex={1} my={5} ml={5}>
          <Text color="white" fontSize="md">
            Object Ref: {data.patrimony}
          </Text>
          <HStack alignItems="center">
            <Clock size={16} color={colors.gray[200]} />
            <Text color="gray.200" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>
        <Circle bg="gray.500" h={12} w={12} mr={5}>
          {data.status === "closed" ? (
            <CircleWavyCheck size={24} color={statusColor} />
          ) : (
            <Hourglass size={24} color={statusColor} />
          )}
        </Circle>
      </HStack>
    </Pressable>
  );
}
