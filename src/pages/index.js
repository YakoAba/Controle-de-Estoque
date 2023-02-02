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
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Produtos = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];
    setListProducts(db_products);
  }, []);

  const handleNewProduct = () => {
    if (!name) return;
    if (verifyProductName()) {
      alert("Produto já cadastrado!");
      return;
    }

    const id = Math.random().toString(36).substring(2);

    if (listProducts && listProducts.length) {
      localStorage.setItem(
        "db_products",
        JSON.stringify([...listProducts, { id, name, url, titulo, descricao }])
      );

      setListProducts([...listProducts, { id, name, url, titulo, descricao }]);
    } else {
      localStorage.setItem(
        "db_products",
        JSON.stringify([{ id, name, url, titulo, descricao }])
      );

      setListProducts([{ id, name, url, titulo, descricao }]);
    }

    setName("");
    setUrl("");
    setTitulo("");
    setDescricao("");
  };

  const verifyProductName = () => {
    return !!listProducts.find((prod) => prod.name === name);
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
      alert("Esse produto possuí movimentações!");
      return;
    }

    const newArray = listProducts.filter((prod) => prod.id !== id);

    localStorage.setItem("db_products", JSON.stringify(newArray));

    setListProducts(newArray);
  };

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />
      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />
        <Box w="100%">
          {url !== "" ? (
            <SimpleGrid m="4">
              <Image
                width="67"
                height="50"
                objectFit="fill"
                src={url}
                alt="LOGO"
              />
            </SimpleGrid>
          ) : null}
          <SimpleGrid h="fit-content" spacing="6">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Url da imagem"
              _placeholder={{ color: "black" }}
            />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do produto"
              maxLength={30}
              _placeholder={{ color: "black" }}
            />
            <Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="titulo do produto"
              maxLength={20}
              _placeholder={{ color: "black" }}
            />
            <Textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="descrição do produto"
              _placeholder={{ color: "black" }}
              h="100px"
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
                  <Th>TÍTULO</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {listProducts.map((item, i) => (
                  <Tr key={i}>
                    <Td color="black">{item.name}</Td>
                    <Td color="black">{item.titulo}</Td>
                    <Td textAlign="end">
                      <Button
                        id="deletar"
                        p="2"
                        h="auto"
                        fontSize={11}
                        color="black"
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
export default Produtos;
