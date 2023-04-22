import { Avatar, Flex, Text, Hide } from "@chakra-ui/react";
import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import ApiStatusButton from '../components/Buttons/ApiStatusButton';

import Head from "next/head";

interface headerProps {
  titulo: String;
}

const Header = ({ titulo }: headerProps) => {
  const { disclosureMenu } = useGlobalContext();

  return (
    <>
      <Head>
        {/* ... */}
      </Head>
      <Flex
        as="header"
        w="100vw"
        maxW={"90%"}
        maxH="70px"
        mx="auto"
        px="2"
        py="2"
        align="center"
        boxShadow="0 1px 0 white"
        backgroundColor="blue.500"
        borderRadius={20}
        color="white"
        fontWeight="bold"
        sx={{ position: "fixed", top: 0, left: 0, right: 0 }}
        justifyContent="space-between" // Adicione esta linha
      >
        <ApiStatusButton />
        <Text fontSize={18}>
          {titulo}
        </Text>
        <Flex alignItems="center" justifyContent="flex-end">
          <Hide below="md">
            <Text mr={3} id="texto_avatar">
              Guilherme Marques
            </Text>
          </Hide>
          <Avatar
            id="avatar"
            bg="white"
            color="blue"
            size="md"
            name="Guilherme Marques"
            colorScheme="blue"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
