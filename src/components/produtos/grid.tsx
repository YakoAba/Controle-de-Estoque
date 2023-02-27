import {
  Checkbox,
  Show,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ProdutosClienteClass } from "../../classes/Produtos";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { PdvModule } from "../../interfaces/Pdv.interface";
import PacMan from "../pacman";

function GridProdutos({ setBotoes }): JSX.Element {
  const toast = useToast();
  const {
    listaProdutos,
    listaProdutosIsLoading,
    mutate,
    setItem,
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

  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    if (listaProdutos) {
      // Inicializa o estado dos checkboxes com um array de false com o mesmo tamanho do número de ingredientes
      setCheckedItems(new Array(listaProdutos.length).fill(false));
    }
  }, [listaProdutos]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const countChecked = (checked) => {
    return checked.filter((item) => item).length;
  };

  const handleCheckAll = (event) => {
    const allChecked = event.target.checked;
    const newCheckedItems = listaProdutos.json.map(() => allChecked);
    setCheckedItems(newCheckedItems);
    setBotoes({ a: !event.target.checked, d: event.target.checked, e: false });
  };

  const handleCheck = (event, index) => {
    // Altera o estado do checkbox na posição index

    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
    const count = countChecked(newCheckedItems);
    setBotoes({ a: count === 0, d: count >= 1, e: count === 1 });
  };

  const renderGrid = () => {
    return listaProdutos.json.map(
      (item: PdvModule.ProdutosClienteInterface, i) => (
        <Tr key={item._id}>
          <Td color="black">
            <Checkbox
              colorScheme={"red"}
              isChecked={checkedItems[i]}
              onChange={(e) => handleCheck(e, i)}
              mr={1}
            />
            {item.nome}
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
            <Checkbox
              colorScheme={"red"}
              mr={1}
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={handleCheckAll}
            />
            TÍTULO
          </Th>
          <Th color="black" textAlign="end">
            BRUTO
          </Th>{" "}
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
  );
}

export default GridProdutos;
