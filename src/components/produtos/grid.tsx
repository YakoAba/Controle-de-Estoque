import { useState, useEffect } from "react";
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
import useSWR from "swr";
import { useProdutoContext } from "./context";

type ContratoInterface = {
  _id: string;
  CPF: string;
  Contratos: number;
  Ativo: boolean;
  Data: Date;
  Itens: [
    {
      NUMERO: string;
      "VALOR DO EMPRÉSTIMO": number;
      "VALOR DA PARCELA": number;
      "QUANTIDADE DE PARCELAS": number;
      "STATUS ATUAL": string;
      "DATA DA PRIMEIRA PARCELA": Date;
    }
  ];
};

function GridProdutos({ setBotoes, setCheckIndex }): JSX.Element {
  const [checkedCliente, setCheckedCliente] = useState([]);

  const allChecked = checkedCliente.every(Boolean);
  const isIndeterminate = checkedCliente.some(Boolean) && !allChecked;
  const countChecked = (checked) => {
    return checked.filter((cliente) => cliente).length;
  };

  const handleCheck = (event, index) => {
    const newCheckedItems = [...checkedCliente];
    newCheckedItems[index] = event.target.checked;

    setCheckedCliente(newCheckedItems);
    };

  const handleCheckAll = (event) => {
    const allChecked = event.currentTarget.checked;
    const newCheckedItems = contratos.map(() => allChecked);
    setCheckedCliente(newCheckedItems);
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("api/c6", fetcher);
  const contratos = data?.contratos || [];


  const renderGrid = () => {
    return contratos.map((contrato: ContratoInterface, index: number) => (
      <Tr key={contrato._id}>
        <Td color="black">
          <HStack>
            <Checkbox
              colorScheme={"blue"}
              isChecked={checkedCliente[index]}
              onChange={(event) => handleCheck(event, index)}
              mr={3}
              borderColor={"black"}
              size={"lg"}
            />
            <Text>{contrato.CPF}</Text>
          </HStack>
        </Td>
        <Td color="black">{contrato.Contratos}</Td>
        <Td>{contrato.Ativo ? "Ativo" : "Inativo"}</Td>
      </Tr>
    ));
  };

  return contratos.length === 0 ? (
    <PacMan />
  ) : (
    <Box
      overflowY="auto"
      maxW={"90%"}
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
      marginLeft="auto"
      marginRight="auto"
    >
      <Table marginTop={"25px"} colorScheme="black" maxW={"100%"}>
        <Thead>
          <Tr>
            <Th w="20%" fontWeight="bold" fontSize="14px">
              <HStack>
                <Checkbox
                  colorScheme={"blue"}
                  mr={3}
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={handleCheckAll}
                  borderColor={"black"}
                  size={"lg"}
                />

                <Text>CPF:</Text>
              </HStack>
            </Th>
            <Th w="20%" color="black">
              Contratos:
            </Th>
            <Th>Status:</Th>
          </Tr>
        </Thead>
        <Tbody>{renderGrid()}</Tbody>
      </Table>
    </Box>
  );
}

export default GridProdutos;
