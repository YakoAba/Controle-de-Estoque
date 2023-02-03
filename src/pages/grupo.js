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
import useSWR from "swr";
import { PacmanLoader } from "react-spinners";

const Grupos = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [listaGrupos, setlistaGrupos] = useState([]);

  const { data, error, isLoading } = useSWR("api/categorias", async (url) => {
    const res = await fetch(url);
    return res.json();
  });

  const handleNewProduct = () => {
    if (!name) return;
    if (verifyProductName()) {
      alert("Grupo já cadastrado!");
      return;
    }
    const id = Math.random().toString(36).substring(2);
    setName("");
    setUrl("");
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

          <SimpleGrid minChildWidth={240} h="fit-content" spacing="5">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Url da imagem"
              _placeholder={{ color: "black" }}
            />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do grupo"
              maxLength={30}
              _placeholder={{ color: "black" }}
            />
            <Button id="cadastrar" w="40" onClick={handleNewProduct}>
              CADASTRAR
            </Button>
          </SimpleGrid>

          <Box>
            {isLoading ? (
              <Box display="flex" justifyContent="center" marginTop="2">
                <PacmanLoader
                  color={"#FF2153"}
                  css={override}
                  size={80}
                />
              </Box>
            ) : (
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
                  {data.success ? (
                    data.categorias.map((item, i) => (
                      <Tr key={i}>
                        <Td color="black">{item.categoria}</Td>
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
export default Grupos;
