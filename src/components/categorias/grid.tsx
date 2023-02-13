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
import { GridCategoriasProps } from "./../../interfaces/Categorias.interface"

function GridCategorias({ data, isLoading }: GridCategoriasProps): JSX.Element {
  const toast = useToast();
  function toastDeletar() {
    return toast({
      title: "Categoria excluido!",
      description: "Excluimos a categoria para você.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }

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
              <Td color="black">{item.name}</Td>
              <Td textAlign="end">
                <Button
                  id={`deletar${i}`}
                  p="2"
                  h="auto"
                  fontSize={11}
                  onClick={toastDeletar}
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
}

export default GridCategorias;
