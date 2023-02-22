import { Flex, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import InputRealBrasil from "../input.realBrasil";
import SliderInput from "../input.taxa";

const Tab2 = () => {
  return (
    <Stack>
      <Stack >
        <Text>Bruto:</Text>
        <InputRealBrasil />
      </Stack>
      <Stack >
        <Text>Taxa:</Text>
        <InputRealBrasil />
      </Stack>
      <Stack >
        <Text>Liquido:</Text>
        <InputRealBrasil />
      </Stack>
      <Stack >
        <Text>Custo:</Text>
        <InputRealBrasil />
      </Stack>
    </Stack>
  );
};

export default Tab2;
