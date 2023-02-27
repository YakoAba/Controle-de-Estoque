import Grid from "./grid";
import { Box, Flex } from "@chakra-ui/react";
import ModalCadProd from "./modal";
import { useGlobalContext } from "../../contexts/GlobalContext";
import ButtonAdicionar from "../Buttons/adicionar";
import { useState } from "react";
import ButtonEditar from "../Buttons/editar";
import ButtonDeletar from "../Buttons/deletar";

const FormularioProdutos = () => {
  const { disclosureModalProdCad } = useGlobalContext();
  const [botoes, setBotoes] = useState({ a: true, d: false, e: false });

  return (
    <Box
      overflowY="auto"
      width="100%"
      maxW={"100%"}
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
      height="calc(100vh - 90px)"
      marginTop={20}
      marginLeft="auto"
      marginRight="auto"
      paddingLeft="3"
      paddingRight="3"
    >
      <ModalCadProd />
      <Flex mt={5}>
        {botoes.a ? (
          <ButtonAdicionar
            fontSize={15}
            mt={0}
            onClick={disclosureModalProdCad.onOpen}
            padding={undefined}
            width={"100%"}
          />
        ) : (
          <></>
        )}
        {botoes.e ? (
          <ButtonEditar
            fontSize={15}
            onClick={disclosureModalProdCad.onOpen}
            padding={"6px 12px"}
            width={"100%"}
            id={""}
            icon={true}
            colorScheme={""}
          >
            EDITAR
          </ButtonEditar>
        ) : (
          <></>
        )}

        {botoes.d ? (
          <ButtonDeletar
            fontSize={15}
            onClick={disclosureModalProdCad.onOpen}
            padding={undefined}
            width={"100%"}
            id={""}
            icon={true}
          >
            DELETAR
          </ButtonDeletar>
        ) : (
          <></>
        )}
      </Flex>
      <Grid setBotoes={setBotoes} />
    </Box>
  );
};

export default FormularioProdutos;
