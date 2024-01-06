import {
  Avatar,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  Image,
  Show,
  Hide,
} from "@chakra-ui/react";
import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FiMenu } from "react-icons/fi";
import Head from "next/head";
import Sidebar from "./Sidebar";

interface headerProps {
  titulo: String;
}

const Header = ({ titulo }: headerProps) => {
  const { disclosureMenu } = useGlobalContext();

  return (
    <>
      <Head>
        <title>Controle de Agendamento</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="red" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="icone.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="appletouch.webp"
        ></link>
        <meta name="author" content="YakkoAba" />
        <meta
          name="description"
          content="Controle de agendamento para salões - Mantenha o seus horários organizado e garanta o sucesso do seu negócio."
        />
      </Head>
      <Sidebar />
      <Flex
        as="header"
        w="100vw"
        maxW={"95%"}
        maxH="70px"
        mx="auto"
        px="2"
        py="2"
        align="center"
        boxShadow="0 1px 0 black"
        color="black"
        fontWeight="bold"
        sx={{ position: "fixed", top: 0, left: 0, right: 0 }}
      >
        <IconButton
          aria-label="menu"
          id="menu"
          icon={<Icon as={FiMenu} />}
          onClick={disclosureMenu.onOpen}
          variant="unstyled"
          fontSize="20"
        ></IconButton>
        <Image
          width="67"
          height="50"
          objectFit="fill"
          src="icone.png"
          alt="LOGO"
        />

        <Text fontSize={18} display={"flex"} flex={1} alignItems={"center"} justifyContent="center" > {titulo}</Text>

        <Flex ml="auto">
          <HStack>
            <Hide below="md">
              <Text>Admin</Text>
            </Hide>

            <Avatar
              bg="red.500"
              color="white"
              size="md"
              name="administrador"
              colorScheme="red"
            />
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
