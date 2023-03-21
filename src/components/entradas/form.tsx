import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import ButtonAdicionar from "../Buttons/adicionar";
import ButtonDeletar from "../Buttons/deletar";
import ButtonEditar from "../Buttons/editar";

const Form = () => {
  const [botoes] = useState({ a: true, e: true, d: true });

  return (
    <>
      <Flex
        mt={"85px"}
        overflowY="auto"
        maxW={"95%"}
        sx={{ "::-webkit-scrollbar": { display: "none" } }}
        marginLeft="auto"
        marginRight="auto"
      >
        {botoes.a ? (
          <ButtonAdicionar
            fontSize={15}
            mt={0}
            // onClick={insert}
            width={"100%"}
            padding={"8px"}
            onClick={() => {}}
          />
        ) : (
          <></>
        )}
        {botoes.e ? (
          <ButtonEditar
            fontSize={15}
            //  onClick={editar}
            padding={"6px 12px"}
            width={"100%"}
            //   id={item._id}
            icon={true}
            colorScheme={"red"}
            onClick={() => {}}
            id={""}
          >
            EDITAR
          </ButtonEditar>
        ) : (
          <></>
        )}
        {botoes.d ? (
          <ButtonDeletar
            fontSize={15}
            //    onClick={deletar}
            padding={undefined}
            width={"100%"}
            icon={true}
            //    id={item._id}
            onClick={() => {}}
            id={""}
          >
            DELETAR
          </ButtonDeletar>
        ) : (
          <></>
        )}
      </Flex>
    </>
  );
};

export default Form;
