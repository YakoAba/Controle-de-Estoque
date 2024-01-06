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
import { useClienteContext } from "./context";
import PacMan from "../pacman";
import { ClientesClass } from "../../classes/clientes";
import { Module } from "../../interfaces/Pdv.interface";

function GridClientes(): JSX.Element {
  const {
    listaClientes,
    listaClientesIsLoading,
    handleCheckAll,
    handleCheck,
    isIndeterminate,
    allChecked,
    checkedItems,
  } = useClienteContext();

  const renderGrid = () => {
    return listaClientes.json.map((item: Module.ClientesInterface, i) => (
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
            <Text id={item._id}>{item.nome}</Text>
          </HStack>
        </Td>
        {/* <Td color="black" width="70%">
          <Text> {item.nome}</Text>
        </Td> */}
        <Td color="black" width="10%">
          <Text> {ClientesClass.formatarTelefoneComDDI(item.telefone)}</Text>
        </Td>
      </Tr>
    ));
  };

  return listaClientesIsLoading ? (
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
            <Th fontWeight="bold" fontSize="14px" width="10%">
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
                <Text>Nome</Text>
              </HStack>
            </Th>
            {/* <Th color="black" width="70%">
              Nome
            </Th> */}
            <Th color="black" width="20%">
              Telefone
            </Th>
          </Tr>
        </Thead>
        <Tbody>{renderGrid()}</Tbody>
      </Table>
    </Box>
  );
}

export default GridClientes;
