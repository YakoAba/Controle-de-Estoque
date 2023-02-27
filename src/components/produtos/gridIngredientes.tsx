import { Checkbox, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { parseFloatToRealBrasil } from "../../config/biblioteca";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { PdvModule } from "../../interfaces/Pdv.interface";
import PacMan from "../pacman";

function GridIngredientes({ setBotoes }): JSX.Element {
  const {
    item: itens,
    setItem,
    disclosureModalProdIngrediente,
  } = useGlobalContext();

  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    if (itens) {
      // Inicializa o estado dos checkboxes com um array de false com o mesmo tamanho do número de ingredientes
      setCheckedItems(new Array(itens.ingredientes.length).fill(false));
    }
  }, [itens]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const countChecked = (checked) => {
    return checked.filter((item) => item).length;
  };

  const handleCheckAll = (event) => {
    // Define o estado de todos os checkboxes para o valor do checkbox no cabeçalho da tabela
    const newCheckedItems = checkedItems.map(() => event.target.checked);
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
    return itens.ingredientes.map((item: PdvModule.IngredienteInteface, i) => (
      <Tr key={item.nome}>
        <Td color="black">
          <Checkbox
            mr={2}
            colorScheme={"red"}
            isChecked={checkedItems[i]}
            onChange={(e) => handleCheck(e, i)}
          />
          {item.produto.nome}
        </Td>
        <Td color="black">{parseFloatToRealBrasil(item.valor)}</Td>
      </Tr>
    ));
  };

  return !itens ? (
    <PacMan />
  ) : (
    <Table marginTop={"px"} colorScheme="black" maxW={"100%"}>
      <Thead>
        <Tr>
          <Th fontWeight="bold" fontSize="14px">
            <Checkbox
              colorScheme={"red"}
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={handleCheckAll}
              mr={1}
            />
            nome
          </Th>
          <Th>valor</Th>
        </Tr>
      </Thead>
      <Tbody>{renderGrid()}</Tbody>
    </Table>
  );
}

export default GridIngredientes;
