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
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Produtos = ({ data }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleNewProduct = () => {
    if (!name) return;
    if (verifyProductName()) {
      alert("Produto já cadastrado!");
      return;
    }

    const id = Math.random().toString(36).substring(2);
    // JSON.stringify([{ id, name, url, titulo, descricao }])

    setName("");
    setUrl("");
    setTitulo("");
    setDescricao("");
  };

  // const verifyProductName = () => {
  //   return !!listProducts.find((prod) => prod.name === name);
  // };

  // const removeProduct = (id) => {

  // };

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
                    TÍTULO
                  </Th>
                  <Th>VALOR</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, i) => (
                  <Tr key={i}>
                    <Td color="black">{item.title}</Td>
                    <Td color="black">{item.price}</Td>
                    <Td textAlign="end">
                      <Button
                        id={`deletar${i}`}
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

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://harmonicaestoque.vercel.app//api/produtos`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}