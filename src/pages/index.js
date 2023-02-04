import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useSWR from "swr";
import FProdutos from "../components/formProdoutos";
import GridProdutos from "../components/gridProdutos";
import PacMan from "../components/pacman";

const Produtos = () => {
  const { data, isLoading } = useSWR("api/produtos", async (url) => {
    const res = await fetch(url);
    return res.json();
  });

  return (
    <Flex height="100vh">
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0 }}>
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
        paddingLeft="6"
        paddingRight="6"
      >
        <Sidebar />
        <FProdutos />
        {isLoading ? <PacMan /> : <GridProdutos data={data} />}
      </Box>
    </Flex>
  );
};

export default Produtos;
