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
  const toast = useToast()
  return isLoading ? (
    <PacMan />
  ) : (
    <Table marginTop={"30px"} colorScheme="black">
      <Thead>
        <Tr>
          <Th fontWeight="bold" fontSize="14px">
            TÌTULO
          </Th>
          <Th>VALOR</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.success ? (
          data.produtos.map((item, i) => (
            <Tr key={i}>
              <Td color="black">{item.title}</Td>
              <Td color="black">{item.price}</Td>
              <Td textAlign="end">
                <Button
                  id={`deletar${i}`}
                  p="2"
                  h="auto"
                  fontSize={11}
                  onClick={() =>
                    toast({
                      title: "Produto excluido!",
                      description: "Excluimos o produto para você.",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                      position: 'top'
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