/* eslint-disable react/no-children-prop */
import { Input, Stack, Text, Textarea } from "@chakra-ui/react";
import InputImage from "../editImage";
import InputKg from "../inputKg";
import { useProdutoContext } from "./context";

const Tab1 = () => {
  const { item, setItem } = useProdutoContext();

  return (
    <Stack>
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
        <InputImage
          value={item.image}
          onChance={(e) => setItem({ ...item, image: e.target.value })}
          id={"image"}
        />
      </Stack>
      <Stack>
        <InputKg
          value={item.peso}
          onChange={(valor: string) =>
            setItem({ ...item, peso: parseFloat(valor) })
          }
          id={"peso"}
        />
      </Stack>
      <Stack>
        <Text mb={-2} mt={1}>
          Descrição:
        </Text>
        <Textarea
          value={item.descricao}
          onChange={(e) => setItem({ ...item, descricao: e.target.value })}
          id={"descricao"}
          _placeholder={{ color: "red.200" }}
          borderColor="black"
          focusBorderColor="red.200"
          _hover={{ borderColor: "red.200" }}
        />
      </Stack >
    </Stack>
  );
};

export default Tab1;
