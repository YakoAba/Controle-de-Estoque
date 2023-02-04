import {
  Avatar,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import { FiMenu } from "react-icons/fi";
import Head from "next/head";

const Header = () => {

  const { onOpen } = useSidebarContext();

  return (
    <>
      <Head>
        <title>Controle de Estoque</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF2153" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="harmonica_cozinha.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="appletouch.webp"
        ></link>
        <meta name="author" content="YakkoAba" />
        <meta
          name="description"
          content="Controle de estoque para lojas - Mantenha o seu estoque organizado e garanta o sucesso do seu negócio."
        />
      </Head>
      <Flex 
        as="header"
        w="100%"
        maxW={"98%"}
        h="70px"
        mx="auto"
        px="2"
        py="2"
        align="center"
        boxShadow="0 1px 0 #ccc"
        color="black"
        fontWeight="bold" 
      >
        <IconButton
          aria-label="menu"
          id="menu"
          icon={<Icon as={FiMenu} />}
          onClick={onOpen}
          variant="unstyled"
          fontSize="20"
          mr="2"
        ></IconButton>

        <Image
          width="67"
          height="50"
          objectFit="fill"
          src="harmonica_cozinha.png"
          alt="LOGO"
        />
        <Flex ml="auto">
          <HStack>
            <Text>Harmônica</Text>
            <Avatar size="md" name="Harmônica" bg="#FF2178" />
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
