import { Box, Flex } from "@chakra-ui/react";
import useSWR from "swr";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Form from "../components/grupos/form";
import Grid from "../components/grupos/grid";
import { useEffect } from "react";

const Grupos = () => {
  const { data, isLoading } = useSWR("api/categorias", async (url) => {
    const res = await fetch(url);
    return res.json();
  });

  return (
    <Flex height="100vh">
      <Sidebar />
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0 }} >
      <Header />
      </Box>
      <Box
        overflowY="auto"
        width="100%"
        sx={{ "::-webkit-scrollbar": { display: "none" } }}
        height="calc(100% - 90px)"
        marginTop={20}
        marginLeft="auto"
        marginRight="auto"
        paddingLeft="5"
        paddingRight="5"
      >
        <Form />
        <Grid data={data} isLoading={isLoading} />
      </Box>
    </Flex>
  );
};

export default Grupos;
