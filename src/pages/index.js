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
import useSWR from "swr";
import PacmanLoader from "react-spinners/PacmanLoader";

const Produtos = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const { data, isLoading } = useSWR("api/produtos", async (url) => {
    const res = await fetch(url);
    return res.json();
  });

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

  // Custom css for loader
  const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 30px;
  `;

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
          <SimpleGrid
            minChildWidth={500}
            h="fit-content"
            spacing="6"
            columns={2}
          >
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
              h="60px"
            />
            <Button id="cadastrar" w="40" onClick={handleNewProduct}>
              CADASTRAR
            </Button>
          </SimpleGrid>

          <Box>
            {isLoading ? (
              <Box  marginTop="2" display="flex" justifyContent="center">
                <PacmanLoader color={"#FF2153"} css={override} size={80} />
              </Box>
            ) : (
              <Table mt="6">
                <Thead>
                  <Tr>
                    <Th fontWeight="bold" fontSize="14px">
                      TÌTULO
                    </Th>
                    <Th>VALOR</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.success ? (
                    data.produtos.map((item, i) => (
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
                    ))
                  ) : (
                    <Tr>
                      <Td>erro na conexõa, volte em um minuto!</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            )}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
export default Produtos;
