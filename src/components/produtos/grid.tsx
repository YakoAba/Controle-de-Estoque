import {
  Box,
  Flex,
  HStack,
  Show,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { ProdutosClienteClass } from "../../classes/Produtos";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { PdvModule } from "../../interfaces/Pdv.interface";
import ButtonDeletar from "../Buttons/deletar";
import ButtonEditar from "../Buttons/editar";
import PacMan from "../pacman";

function GridProdutos(): JSX.Element {
  const toast = useToast();
  const {
    listaProdutos,
    listaProdutosIsLoading,
    mutate,
    setItem,
    item,
    disclosureModalProdCad,
  } = useGlobalContext();

  function toastDeletar() {
    return toast({
      title: "Produto excluido!",
      description: "Excluimos o produto para você.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }

  async function deletar(id) {
    const response = await ProdutosClienteClass.deleteDB({ id: id });
    await mutate();
    return response;
  }

  async function editar(id) {
    const produto = await ProdutosClienteClass.dbOne({ id: id });
    setItem(produto.json);
    await mutate();
    disclosureModalProdCad.onOpen();

    return produto;
  }

  const renderGrid = () => {
    return listaProdutos.json.map(
      (item: PdvModule.ProdutosClienteInterface, i) => (
        <Tr key={item._id}>
          <Td color="black">{item.nome}</Td>
          <Show above={"sm"}>
            <Td color="black" textAlign="end">
              {item.venda.bruto.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                style: "currency",
                currency: "BRL",
              })}
            </Td>
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
          <Td color="black" textAlign="end" maxWidth={40}>
            <Flex
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <ButtonEditar
                id={item._id}
                onClick={() => editar(item._id)}
                fontSize={8}
                padding="4px 7px"
                icon={true}
                colorScheme={""}
                width={""}
              >
                EDITAR
              </ButtonEditar>
              <Box mt={1}/>
              <ButtonDeletar
                id={item._id}
                onClick={() => deletar(item._id)}
                fontSize={8}
                padding="5px"
                icon={true}
                width={""}
              >
                DELETAR
              </ButtonDeletar>
            </Flex>
          </Td>
        </Tr>
      )
    );
  };

  return listaProdutosIsLoading ? (
    <PacMan />
  ) : (
    <Table marginTop={"25px"} colorScheme="black" maxW={"100%"}>
      <Thead>
        <Tr>
          <Th fontWeight="bold" fontSize="14px">
            TÍTULO
          </Th>
          <Show above={"sm"}>
            <Th color="black" textAlign="end">
              BRUTO
            </Th>
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
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>{renderGrid()}</Tbody>
    </Table>
  );
}

export default GridProdutos;
