import {
  Box,
  Checkbox,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import PacMan from "../pacman";
import { useItensContext } from "./context";

function GridItens(): JSX.Element {
  const { listaItens, listaItensIsLoading } = useItensContext();
  // const toast = useToast();

  // function toastDeletar() {
  //   return toast({
  //     title: "Produto excluido!",
  //     description: "Excluimos o produto para você.",
  //     status: "success",
  //     duration: 5000,
  //     isClosable: true,
  //     position: "top",
  //   });
  // }

  const renderGrid = () => {
    return listaItens.map((item, i) => (
      <Tr key={i}>
        <Td color="black">
          <HStack>
            <Checkbox
              colorScheme={"red"}
              //   isChecked={checkedItems[i]}
              // onChange={(e) => handleCheck(e, i)}
              mr={3}
              borderColor={"black"}
              size={"lg"}
            />
            <Text id={item._id}>{item.nome}</Text>
          </HStack>
        </Td>
        <Td>
          <Text id={item._id}>{item.unidade}</Text>
        </Td>
        <Td>
          <Text id={item._id}>
            {item.valor.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </Td>
        <Td>
          <Text id={item._id}>{item.quantidades.quantidade}</Text>
        </Td>
        <Td>
          <Text id={item._id}>{item.quantidades.peso}</Text>
        </Td>
        <Td>
          <Text id={item._id}>
            {item.quantidades.valor.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </Td>
      </Tr>
    ));
  };

  return listaItensIsLoading ? (
    <PacMan />
  ) : (
    <Box
      overflowY="auto"
      maxW={"95%"}
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
      marginLeft="auto"
      marginRight="auto"
    >
      <Table marginTop={"25px"} colorScheme="black" maxW={"100%"}>
        <Thead>
          <Tr>
            <Th fontWeight="bold" fontSize="14px">
              <HStack>
                <Checkbox
                  colorScheme={"red"}
                  mr={3}
                  //  isChecked={allChecked}
                  //  isIndeterminate={isIndeterminate}
                  //  onChange={handleCheckAll}
                  borderColor={"black"}
                  size={"lg"}
                />
                <Text>TÍTULO</Text>
              </HStack>
            </Th>
            <Th>UNIDADE</Th>
            <Th>VALOR</Th>
            <Th>PORÇÕES</Th>
            <Th>PESO</Th>
            <Th>VALOR</Th>
          </Tr>
        </Thead>
        <Tbody>{renderGrid()}</Tbody>
      </Table>
    </Box>
  );
}

export default GridItens;
