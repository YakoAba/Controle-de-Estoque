/* eslint-disable react/no-children-prop */
import { Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { useClienteContext } from "./context";

const Tab1 = () => {
  const { item, setItem } = useClienteContext();

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
      <Stack>
        <Text mb={-2} mt={1}>
          Telefone
        </Text>
        <Input
          value={item.telefone}
          _placeholder={{ color: "red.200" }}
          borderColor="black"
          focusBorderColor="red.200"
          _hover={{ borderColor: "red.200" }}
          onChange={(e) => setItem({ ...item, telefone: e.target.value })}
          id="numero"
        ></Input>
      </Stack>
    </>
  );
};

export default Tab1;
