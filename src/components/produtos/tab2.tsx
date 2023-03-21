import { Stack, Text } from "@chakra-ui/react";
import BrazilianRealInput from "../BrazilianRealInput";
import { useProdutoContext } from "./context";

const Tab2 = () => {
  const { item, setItem } = useProdutoContext();
  return (
    <Stack>
      <Stack>
        <Text>Bruto:</Text>
        <BrazilianRealInput
          value={item.venda.bruto}
          onChange={(valor) =>
            setItem({
              ...item,
              venda: { ...item.venda, bruto: parseFloat(valor) },
            })
          }
          id={"bruto"}
        />
      </Stack>
      <Stack>
        <Text>Taxa:</Text>
        <BrazilianRealInput
          value={item.venda.taxa}
          onChange={(valor) =>
            setItem({
              ...item,
              venda: { ...item.venda, taxa: parseFloat(valor) },
            })
          }
          id={"taxa"}
        />
      </Stack>

      <Stack>
        <Text>Liquido:</Text>
        <BrazilianRealInput
          value={item.venda.liquido}
          onChange={(valor) =>
            setItem({
              ...item,
              venda: { ...item.venda, liquido: parseFloat(valor) },
            })
          }
          id={"liquido"}
        />
      </Stack>
      <Stack>
        <Text>Custo:</Text>
        <BrazilianRealInput
          value={item.venda.custo}
          onChange={(valor) =>
            setItem({
              ...item,
              venda: { ...item.venda, custo: parseFloat(valor) },
            })
          }
          id={"custo"}
        />
      </Stack>
    </Stack>
  );
};

export default Tab2;
