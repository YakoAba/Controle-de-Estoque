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

import { PdvModule } from "../../interfaces/Pdv.interface";
import ButtonDeletar from "../Buttons/deletar";

function GridProdutos({ data }): JSX.Element {
  const toast = useToast();

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

  //  function deletar({id}) {
  //    return (new ProdutosClienteClass).deleteDB({id:id});
  //  }

  const renderGrid = () => {
    const produtos = JSON.parse(data) as PdvModule.ProdutosClienteInterface[];
    return produtos.map((item, i) => (
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
            {item.venda.lucro.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              style: "currency",
              currency: "BRL",
            })}
          </Td>
          <Td color="black" textAlign="end">
            {(
              ((item.venda.bruto - item.venda.lucro) / item.venda.bruto) *
              100
            ).toFixed(2)}
            %
          </Td>
        </Show>
        <Td color="black" textAlign="end">
          <ButtonDeletar id={i} onClick={null}/>
        </Td>
      </Tr>
    ));
  };

  return (
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
