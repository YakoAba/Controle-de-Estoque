import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Grupos = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [listaGrupos, setlistaGrupos] = useState([]);

  useEffect(() => {
    const db_grupos = localStorage.getItem("db_grupos")
      ? JSON.parse(localStorage.getItem("db_grupos"))
      : [];

    setlistaGrupos(db_grupos);
  }, []);

  const handleNewProduct = () => {
    if (!name) return;
    if (verifyProductName()) {
      alert("Grupo já cadastrado!");
      return;
    }

    const id = Math.random().toString(36).substring(2);

    if (listaGrupos && listaGrupos.length) {
      localStorage.setItem(
        "db_grupos",
        JSON.stringify([...listaGrupos, { id, name, url }])
      );

      setlistaGrupos([...listaGrupos, { id, name, url }]);
    } else {
      localStorage.setItem("db_grupos", JSON.stringify([{ id, name, url }]));

      setlistaGrupos([{ id, name, url }]);
    }

    setName("");
    setUrl("");
  };

  const verifyProductName = () => {
    return !!listaGrupos.find((prod) => prod.name === name);
  };

  const removeProduct = (id) => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : [];

    const db_stock_entries = localStorage.getItem("db_stock_entries")
      ? JSON.parse(localStorage.getItem("db_stock_entries"))
      : [];

    const hasOutputs = db_stock_outputs.filter(
      (item) => item.product_id === id
    ).length;
    const hasEntries = db_stock_entries.filter(
      (item) => item.product_id === id
    ).length;

    if (hasEntries || hasOutputs) {
      alert("Esse grupo possuí movimentações!");
      return;
    }

    const newArray = listaGrupos.filter((prod) => prod.id !== id);

    localStorage.setItem("db_grupos", JSON.stringify(newArray));

    setlistaGrupos(newArray);
  };

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />
        <Box w="100%">
          <SimpleGrid m="4">
            {url !== "" ? (
              <Image
                width="67"
                height="50"
                objectFit="fill"
                src={url}
                alt="LOGO"
              />
            ) : (
              <></>
            )}
          </SimpleGrid>

          <SimpleGrid minChildWidth={240} h="fit-content" spacing="5">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Url da imagem"
            />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do grupo"
              maxLength={30}
            />
            <Button id="cadastrar" w="40" onClick={handleNewProduct}>
              CADASTRAR
            </Button>
          </SimpleGrid>

          <Box overflowY="auto" height="80vh">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize="14px">
                    Nome
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {listaGrupos.map((item, i) => (
                  <Tr key={i}>
                    <Td color="gray.500">{item.name}</Td>
                    <Td textAlign="end">
                      <Button
                        id="deletar"
                        p="2"
                        h="auto"
                        fontSize={11}
                        color="red.500"
                        fontWeight="bold"
                        onClick={() => removeProduct(item.id)}
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
export default Grupos;
