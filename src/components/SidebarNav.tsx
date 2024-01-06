import React from "react";
import { Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGlobalContext } from "../contexts/GlobalContext";


const SidebarNav = () => {
  const { asPath } = useRouter();
  const { sections } = useGlobalContext();
  
  
  const renderLinks = (links) =>
    links.map(({ label, href = "#" }) => (
      <ChakraLink
        as={Link}
        key={label}
        _hover={{ bg: "gray.100" }}
        px="4"
        py="2"
        borderRadius={5}
        bg={asPath === href ? "gray.200" : ""}
        href={href}
      >
        <Text fontSize="md" fontWeight="medium" color="black">
          {label}
        </Text>
      </ChakraLink>
    ));

  return (
    <Stack spacing="6">
      <Stack spacing="6">
        {sections.map(({ title, links }) => (
          <Stack key={title}>
            <Text fontSize="xs" fontWeight="bold" color="black">
              {title}
            </Text>
          
            {renderLinks(links)}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default SidebarNav;
