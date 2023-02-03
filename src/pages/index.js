import {
  Box,
  Flex,

} from "@chakra-ui/react";
import Header from "../components/Header";
import Produtos from "../components/produto";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <Flex h="100vh" flexDirection="column">
      <Box position= "fixed" top= {0} width = "100%" >
        <Header />
      </Box>
      <Flex  my="6" maxW={1120} mx="auto" px="6" h="100vh" mt={100}  overflow="auto" >
        <Sidebar />
        <Produtos />
      </Flex>
  </Flex>
  );
  }

export default Home;
