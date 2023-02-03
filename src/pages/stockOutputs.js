import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const StockOutputs = () => {
  const [amount, setAmount] = useState("");
  const [product_id, setProduct_id] = useState("0");
  const [listaPedidos, setlistaPedidos] = useState([]);

  useEffect(() => {
    fetch('/api/pedido')
    .then((res) => res.json())
    .then((data) => {
      // setData(data)
      // setLoading(false)
      setlistaPedidos(data.pedidos);
    })
  }, []);

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />

        <Box w="100%">
          <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
            <Select
              value={product_id}
              onChange={(e) => setProduct_id(e.target.value)}
            ></Select>
            <Input
              placeholder="Quantidade"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              id="salvar"
              w="40"
              // onClick={handleNewOutput}
            >
              SALVAR
            </Button>
          </SimpleGrid>

          <Box overflowY="auto" height="80vh">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize="14px">
                    Nome
                  </Th>
                  <Th fontWeight="bold" fontSize="14px">
                    Total
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {listaPedidos.map((item, i) => (
                  <Tr key={i}>
                    <Td color="gray.500">{item.Cliente.nome}</Td>
                    <Td color="gray.500">
                      {item.valortotal.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Td>
                    <Td textAlign="end">
                      <Button
                        id="deletar"
                        p="2"
                        h="auto"
                        fontSize={11}
                        color="red.500"
                        fontWeight="bold"
                        //  onClick={() => removeOutput(item.id)}
                      >
                        DELETAR
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default StockOutputs;
