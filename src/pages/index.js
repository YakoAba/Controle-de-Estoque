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

  return (
    <Flex flexDirection="column">
      <Box id="header" w="100%" position="fixed" zIndex={1}>
        <Header />
      </Box>
      <Box w="100%" position="fixed" h="100vh">
        <Flex
          w="100%"
          my="6"
          maxW="94%"
          mx="auto"
          px="6"
          marginTop="90px"
          h="calc(100vh - 90px)"
        >
          <Sidebar />
          <Box
            w="100%"
            maxW="100%"
            overflowY="auto"
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
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
              h="fit-content"
              spacing="6"
              columns={1}
              // marginTop="80px"
              w="100%"
            >
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Url da imagem"
                _placeholder={{ color: "black" }}
                borderColor="black"
                focusBorderColor='#FF2153'
              />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do produto"
                maxLength={30}
                _placeholder={{ color: "black" }}
                borderColor="black"
                focusBorderColor='#FF2153'
              />
              <Input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="titulo do produto"
                maxLength={20}
                _placeholder={{ color: "black" }}
                borderColor="black"
                focusBorderColor='#FF2153'
              />
              <Textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="descrição do produto"
                _placeholder={{ color: "black" }}
                h="60px"
                borderColor="black"
                focusBorderColor='#FF2153'
              />
              <Button id="cadastrar" w="40" onClick={handleNewProduct}>
                CADASTRAR
              </Button>
            </SimpleGrid>
            {isLoading ? (
              <Box marginTop="3" display="flex" justifyContent="center">
                <PacmanLoader color={"#FF2153"} size={70} />
              </Box>
            ) : (
              <Table marginTop={"30px"} colorScheme="black">
                <Thead > 
                  <Tr>
                    <Th fontWeight="bold" fontSize="14px">
                      TÌTULO
                    </Th>
                    <Th>VALOR</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody >
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
        </Flex>
      </Box>
    </Flex>
  );
};

export default Produtos;
