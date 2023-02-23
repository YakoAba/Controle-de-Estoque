/* eslint-disable react/no-children-prop */
import { Input, Stack, Text } from "@chakra-ui/react";
// import InputImage from "../editImage";
// import InputKg from "../inputKg";
import { PdvModule } from "../../interfaces/Pdv.interface";
import { Dispatch, SetStateAction } from "react";
import InputImage from "../editImage";
import InputKg from "../inputKg";

type Tab1Props = {
  item: PdvModule.ProdutosClienteInterface;
  setItem: Dispatch<SetStateAction<PdvModule.ProdutosClienteInterface>>;
};

const Tab1 = ({ item, setItem }: Tab1Props) => {
  return (
    <Stack>
      <Stack>
        <Text mb={-1} mt={2}>
          Nome:
        </Text>
        <Input
          value={item.nome}
          _placeholder={{ color: "red" }}
          borderColor="black"
          focusBorderColor="red.200"
          _hover={{ borderColor: "red" }}
          onChange={(e) => setItem({ ...item, nome: e.target.value})}
          id="nome"
        ></Input>
      </Stack>
      <Stack>
        <InputImage value={item.image} onChance={(e) => setItem({...item, image: e.target.value})} id={"image"} />
      </Stack>
      <Stack>
        <InputKg value={item.peso} onChange={(valor) => setItem({...item,peso:valor})} id={"peso"} />
      </Stack>
    </Stack>
  );
};

export default Tab1;
