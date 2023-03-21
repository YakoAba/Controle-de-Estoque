import { Flex, Stack } from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/GlobalContext";

import GridIngredientes from "./gridIngredientes";
import ModalCadProd2 from "./ingrediente";
import ButtonAdicionar from "../Buttons/adicionar";
import ButtonDeletar from "../Buttons/deletar";
import ButtonEditar from "../Buttons/editar";
import { useProdutoContext } from "./context";

const Tab3 = () => {
  const { disclosureModalProdIngrediente } = useGlobalContext();
  const { setBotoesIngredientes, botoesIngredientes } = useProdutoContext();

  return (
    <Stack
      overflow={"auto"}
      maxHeight={"340px"}
     
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
      <Flex>
      {botoesIngredientes.a ? (
        <ButtonAdicionar
          fontSize={15}
          mt={0}
          onClick={disclosureModalProdIngrediente.onOpen}
          padding={"8px"}
          width={"100%"}
        />
      ) : (
        <></>
      )}
   
        {botoesIngredientes.e ? (
          <ButtonEditar
            id={""}
            fontSize={15}
            padding={"6px 12px"}
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

        {botoesIngredientes.d ? (
          <ButtonDeletar
            id={"delete"}
            onClick={null}
            fontSize={15}
            padding={undefined}
            icon={true}
            width={"100%"}
          >
            DELETE
          </ButtonDeletar>
        ) : (
          <></>
        )}
      </Flex>

      <GridIngredientes />
    </Stack>
  );
};

export default Tab3;
