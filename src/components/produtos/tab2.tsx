import { Stack, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { PdvModule } from "../../interfaces/Pdv.interface";
import InputRealBrasil from "../input.realBrasil";

type Tab2Props = {
  item: PdvModule.ProdutosClienteInterface;
  setItem: Dispatch<SetStateAction<PdvModule.ProdutosClienteInterface>>;
};

const Tab2 = ({ item, setItem }: Tab2Props) => {
  return (
    <Stack>
      <Stack>
        <Text>Bruto:</Text>
        <InputRealBrasil
          value={item.venda.bruto}
          onChange={(valor) =>
            setItem({ ...item, venda: { ...item.venda, bruto: valor } })
          }
          id={"bruto"}
        />
      </Stack>
      <Stack>
        <Text>Taxa:</Text>
        <InputRealBrasil
          value={item.venda.taxa}
          onChange={(valor) =>
            setItem({ ...item, venda: { ...item.venda, taxa: valor } })
          }
          id={"taxa"}
        />
      </Stack>

      <Stack>
        <Text>Liquido:</Text>
        <InputRealBrasil
          value={item.venda.liquido}
          onChange={(valor) =>
            setItem({ ...item, venda: { ...item.venda, liquido: valor } })
          }
          id={"liquido"}
        />
      </Stack>
      <Stack>
        <Text>Custo:</Text>
        <InputRealBrasil
          value={item.venda.custo}
          onChange={(valor) =>
            setItem({ ...item, venda: { ...item.venda, custo: valor } })
          }
          id={"custo"}
        />
      </Stack>
    </Stack>
  );
};

export default Tab2;
