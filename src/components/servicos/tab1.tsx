/* eslint-disable react/no-children-prop */
import { Input, Stack, Text } from "@chakra-ui/react";
import { useServicoContext } from "./context";

const Tab1 = () => {
  const { item, setItem } = useServicoContext();

  return (
    <> 
      <Stack>
        <Text mb={-2} mt={1}>
          Nome:
        </Text>
        <Input
          value={item.nome}
          _placeholder={{ color: "red.200" }}
          borderColor="black"
          focusBorderColor="red.200"
          _hover={{ borderColor: "red.200" }}
          onChange={(e) => setItem({ ...item, nome: e.target.value })}
          id="nome"
        ></Input>
      </Stack>
    </>
  );
};

export default Tab1;
