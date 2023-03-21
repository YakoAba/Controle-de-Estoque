import {
  Box,
  Checkbox,
  HStack,
  Show,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useProdutoContext } from "./context";
import { PdvModule } from "../../interfaces/Pdv.interface";
import PacMan from "../pacman";

function GridProdutos(): JSX.Element {
  // const toast = useToast();
  const {
    listaProdutos,
    listaProdutosIsLoading,
    handleCheckAll,
    handleCheck,
    isIndeterminate,
    allChecked,
    checkedItems,
  } = useProdutoContext();

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
    return listaProdutos.json.map((item: PdvModule.ProdutosInterface, i) => (
      <Tr key={i}>
        <Td color="black">
          <HStack>
            <Checkbox
              colorScheme={"red"}
              isChecked={checkedItems[i]}
              onChange={(e) => handleCheck(e, i)}
              mr={3}
              borderColor={"black"}
              size={"lg"}
            />
            <Text id={item._id}>{item.nome}</Text>
          </HStack>
        </Td>
        <Td color="black" textAlign="end">
          {item.venda.bruto.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            style: "currency",
            currency: "BRL",
          })}
        </Td>
        <Show above={"sm"}>
          <Td color="black" textAlign="end">
            {item.venda.custo.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              style: "currency",
              currency: "BRL",
            })}
          </Td>
          <Td color="black" textAlign="end">
            {(item.venda.bruto - item.venda.liquido).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              style: "currency",
              currency: "BRL",
            })}
          </Td>
          <Td color="black" textAlign="end">
            {item.venda.lucro.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              style: "currency",
              currency: "BRL",
            })}
          </Td>
        </Show>
      </Tr>
    ));
  };

  return listaProdutosIsLoading ? (
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
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={handleCheckAll}
                  borderColor={"black"}
                  size={"lg"}
                />
                <Text>TÍTULO</Text>
              </HStack>
            </Th>
            <Th color="black" textAlign="end">
              BRUTO
            </Th>
            <Show above={"sm"}>
              <Th color="black" textAlign="end">
                CUSTO
              </Th>
              <Th color="black" textAlign="end">
                TAXA
              </Th>
              <Th color="black" textAlign="end">
                LUCRO
              </Th>
            </Show>
          </Tr>
        </Thead>
        <Tbody>{renderGrid()}</Tbody>
      </Table>
    </Box>
  );
}

export default GridProdutos;
