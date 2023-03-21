import { Checkbox, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { parseFloatToRealBrasil } from "../../config/biblioteca";

import { PdvModule } from "../../interfaces/Pdv.interface";
import PacMan from "../pacman";
import { useProdutoContext } from "./context";

function GridIngredientes(): JSX.Element {
  const {
    item: itens,
    checkedItemsIngredientes,
    allCheckedIngredientes,
    isIndeterminateIngredientes,
    handleCheckIngredientes,
    handleCheckAllIngredientes,
  } = useProdutoContext();

  const renderGrid = () => {
    return itens.ingredientes.map((item: PdvModule.IngredienteInteface, i) => (
      <Tr key={i}>
        <Td color="black">
          <Checkbox
            mr={2}
            colorScheme={"red"}
            isChecked={checkedItemsIngredientes[i]}
            onChange={(e) => handleCheckIngredientes(e, i)}
            borderColor={"black"}
            size={"lg"}
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
    <Table colorScheme="black" maxW={"100%"}>
      <Thead>
        <Tr>
          <Th fontWeight="bold" fontSize="14px">
            <Checkbox
              colorScheme={"red"}
              isChecked={allCheckedIngredientes}
              isIndeterminate={isIndeterminateIngredientes}
              onChange={handleCheckAllIngredientes}
              mr={3}
              borderColor={"black"}
              size={"lg"}
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
