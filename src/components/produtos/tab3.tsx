import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/GlobalContext";

import GridIngredientes from "./gridIngredientes";
import ModalCadProd2 from "./ingrediente";
import ButtonAdicionar from "../Buttons/adicionar";
import ButtonDeletar from "../Buttons/deletar";
import ButtonEditar from "../Buttons/editar";
import { useState } from "react";

const Tab3 = () => {
  const { disclosureModalProdIngrediente } = useGlobalContext();
  const [botoes, setBotoes] = useState({ a: true, d: false, e: false });

  return (
    <Stack
      overflow={"auto"}
      maxHeight={"55vh"}
      minHeight={"55vh"}
      w={"100%"}
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {/* <Stack>
        <Text>Valor:</Text>
        <NumeroInput></NumeroInput>
      </Stack>
      <Stack>
        <Text>Valor:</Text>
        <BrazilianRealInput></BrazilianRealInput>
      </Stack> */}
      {/* <ModalCadProd2/> */}

      {/* <Button onClick={disclosureModalProdIngrediente.onOpen}>tese</Button> */}
      <ModalCadProd2 />
      <Flex
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
      >
        {botoes.a ? (
          <ButtonAdicionar
            fontSize={15}
            mt={0}
            onClick={disclosureModalProdIngrediente.onOpen}
            padding={"10px"}
            width={"100%"}
          />
        ) : (
          <></>
        )}

        {botoes.e ? (
          <ButtonEditar
            id={""}
            fontSize={15}
            padding={"8px"}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            icon={true}
            colorScheme={"red"}
            width={"100%"}
          >
            EDITAR
          </ButtonEditar>
        ) : (
          <></>
        )}

        {botoes.d ? (
          <ButtonDeletar
            id={"delete"}
            onClick={null}
            fontSize={15}
            padding={"10px"}
            icon={true}
            width={"100%"}
          >
            DELETE
          </ButtonDeletar>
        ) : (
          <></>
        )}
      </Flex>

      <GridIngredientes setBotoes={setBotoes} />
    </Stack>
  );
};

export default Tab3;
