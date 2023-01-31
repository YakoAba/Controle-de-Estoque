import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Groups = () => {
  const [name, setName] = useState("");
  const [listGroups, setListGroups] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const db_groups = localStorage.getItem("db_groups")
      ? JSON.parse(localStorage.getItem("db_groups"))
      : [];

    setListGroups(db_groups);
  }, []);

  const handleNewGroup = () => {
    const errorMessage = !name
      ? "Group name is required"
      : verifyGroupName()
      ? "Group already registered"
      : null;

    if (errorMessage) {
      toast({
        position: "top",
        title: "Validation",
        description: errorMessage,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const id = Math.random().toString(36).substring(2);
    const newGroups = [...listGroups, { id, name }];

    localStorage.setItem("db_gruops", JSON.stringify(newGroups));
    setListGroups(newGroups);
    setName("");

    toast({
      position: "top",
      title: "Success",
      description: "Group created successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    return;
  };

  const verifyGroupName = () => {
    return !!listGroups.find((prod) => prod.name === name);
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
      alert("This group has movements!!");
      return;
    }

    const newArray = listGroups.filter((prod) => prod.id !== id);

    localStorage.setItem("db_gruops", JSON.stringify(newArray));

    setListGroups(newArray);
    toast({
        position: "top",
        title: "Success",
        description: "Group removed successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  };

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />

        <Box w="100%">
          <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of group"
            />
            <Button id="cadastrar" w="40" onClick={handleNewGroup}>
              REGISTER
            </Button>
          </SimpleGrid>

          <Box overflowY="auto" height="80vh">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize="14px">
                    NAME
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {listGroups.map((item, i) => (
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
                        DELETE
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
export default Groups;
