import { Stack, Text } from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import BrazilianRealInput from "../BrazilianRealInput";
import NumeroInput from "../inputNumero";

const Tab3 = () => {
  const { item, setItem } = useGlobalContext();
  return (
    <Stack>
      <Stack>
        <Text>Valor:</Text>
        <NumeroInput></NumeroInput>
      </Stack>
      <Stack>
        <Text>Valor:</Text>
        <BrazilianRealInput></BrazilianRealInput>
      </Stack>
    </Stack>
  );
};

export default Tab3;
