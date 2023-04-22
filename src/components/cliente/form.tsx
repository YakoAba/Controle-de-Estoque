import { Flex } from "@chakra-ui/react";
import { useClienteContext } from "./context";
import ButtonAdicionar from "../Buttons/adicionar";
import ButtonDeletar from "../Buttons/deletar";
import ButtonEditar from "../Buttons/editar";
import ModalCadProd from "./modal";

const FormularioProdutos = () => {
  const { botoes, editar, deletar, insert, cliente } = useClienteContext();

  return (
    <>
      <ModalCadProd />
      <Flex
        mt={"85px"}
        overflowY="auto"
        maxW={"90%"}
        sx={{ "::-webkit-scrollbar": { display: "none" } }}
        marginLeft="auto"
        marginRight="auto"
      >
        {botoes.a ? (
          <ButtonAdicionar
            fontSize={'18'}
            mt={0}
            onClick={insert}
            width={"15%"}
            padding={"8px"}
          />
        ) : (
          <></>
        )}
        {botoes.e ? (
          <ButtonEditar
            fontSize={18}
            onClick={editar}
            padding={"6px 12px"}
            width={"15%"}
            id={cliente.id.toString()}
            icon={true}
            colorScheme={"blue"}
          >
            Editar
          </ButtonEditar>
        ) : (
          <></>
        )}
        {botoes.d ? (
          <ButtonDeletar
            fontSize={18}
            onClick={deletar}
            padding={undefined}
            width={"15%"}
            icon={true}
            id={cliente.id.toString()}
          >
            Deletar
          </ButtonDeletar>
        ) : (
          <></>
        )}
      </Flex>
    </>
  );
};

export default FormularioProdutos;
