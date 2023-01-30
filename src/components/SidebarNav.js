import React from "react";
import { Box, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import sections from "./navLinks";
const SidebarNav = () => {
  const { asPath } = useRouter();
  const links = sections.reduce((acc, { links }) => [...acc, ...links], []);

  const renderLinks = (links) =>
    links.map(({ label, href = "#" }) => (
      <ChakraLink
        key={label}
        _hover={{ bg: "gray.100" }}
        px="4"
        py="2"
        borderRadius={5}
        bg={asPath === href ? "gray.200" : ""}
        href={href}
      >
        <Link href={href}>
          <Text fontSize="md" fontWeight="medium" color="black">
            {label}
          </Text>
        </Link>
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
