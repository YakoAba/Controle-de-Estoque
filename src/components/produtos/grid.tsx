import {
  Show,
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
import PacMan from "../pacman";

function GridProdutos(): JSX.Element {
  const toast = useToast();
  const { listaProdutos, listaProdutosIsLoading, mutate } = useGlobalContext();

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
    const response = await ProdutosClienteClass.deleteDB(id);
    mutate();
    return response;
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
            <Td color="black" textAlign="end">
              {(item.venda.custo !== 0
                ? (item.venda.lucro / item.venda.custo) * 100
                : 100
              ).toFixed(2)}
              %
            </Td>
          </Show>
          <Td color="black" textAlign="end">
            <ButtonDeletar id={i} onClick={() => deletar(item._id)} />
          </Td>
        </Tr>
      )
    );
  };

  return listaProdutosIsLoading ? (
    <PacMan />
  ) : (
    <Table marginTop={"25px"} colorScheme="black">
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
            <Th color="black" textAlign="end">
              PORCENTAGEM
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
