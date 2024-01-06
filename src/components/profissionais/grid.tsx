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
import { useProfissionalContext } from "./context";
import PacMan from "../pacman";
import { Module } from "../../interfaces/Pdv.interface";

function GridProfissionais(): JSX.Element {
  const {
    listaProfissionais,
    listaProfissionaisIsLoading,
    handleCheckAll,
    handleCheck,
    isIndeterminate,
    allChecked,
    checkedItems,
  } = useProfissionalContext();

  const renderGrid = () => {
    return listaProfissionais.json.map((item: Module.ProfissionaisInterface, i) => (
      <Tr key={i}>
        <Td color="black" width="10%">
          <HStack>
            <Checkbox
              colorScheme={"red"}
              isChecked={checkedItems[i]}
              onChange={(e) => handleCheck(e, i)}
              mr={2}
              borderColor={"black"}
              size={"lg"}
            />
            <Text id={item._id}>{item._id}</Text>
          </HStack>
        </Td>
        <Td color="black" width="90%">
          <Text> {item.nome}</Text>
        </Td>
      </Tr>
    ));
  };

  return listaProfissionaisIsLoading ? (
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
            <Th fontWeight="bold" fontSize="14px" width="20%">
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
                <Text>ID</Text>
              </HStack>
            </Th>
            <Th color="black" width="60%">
              Nome
            </Th>
          </Tr>
        </Thead>
        <Tbody>{renderGrid()}</Tbody>
      </Table>
    </Box>
  );
}

export default GridProfissionais;