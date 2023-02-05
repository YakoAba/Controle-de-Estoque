import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import PacMan from "../pacman";
import { DeleteIcon } from "@chakra-ui/icons";

const GridProdutos = ({ data, isLoading }) => {
  const toast = useToast();
  return isLoading ? (
    <PacMan />
  ) : (
    <Table marginTop={"30px"} colorScheme="black">
      <Thead>
        <Tr>
          <Th fontWeight="bold" fontSize="14px">
            NOME
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.success ? (
          data.categorias.map((item, i) => (
            <Tr key={i}>
              <Td color="black">{item.categoria}</Td>
              <Td textAlign="end">
                <Button
                  id={`deletar${i}`}
                  p="2"
                  h="auto"
                  fontSize={11}
                  onClick={() =>
                    toast({
                      title: "Grupo excluido!",
                      description: "Excluimos o grupo para você.",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                      position: "top",
                    })
                  }
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  variant="solid"
                  
                >
                  DELETAR
                </Button>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td>erro na conexão, volte em um minuto!</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default GridProdutos;
