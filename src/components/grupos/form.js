import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Image,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";

const FormularioGrupos = () => {
  const [grupo, setGrupo] = useState({
    name: "",
    url: ""
  });

  const handleChange = (e) => {
    setGrupo({
      ...grupo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      {grupo.url ? (
        <SimpleGrid m="4">
          <Image width="67" height="50" objectFit="fill" src={grupo.url} alt="LOGO" />
        </SimpleGrid>
      ) : null}

      <SimpleGrid h="fit-content" spacing="6" columns={1}>
        <Input
          value={grupo.url}
          onChange={handleChange}
          placeholder="Url da imagem"
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="#FF2153"
          _hover={{ borderColor: "#FF2153" }}
          mt="10px"
          name="url"
          id="url"
        />
        <Input
          value={grupo.name}
          onChange={handleChange}
          placeholder="Nome do grupo"
          maxLength={30}
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="#FF2153"
          _hover={{ borderColor: "#FF2153" }}
          name="name"
          id="name"
        />
        <Button
          id={`cadastrar`}
          p="2"
          h="auto"
          fontSize={18}
          leftIcon={<AddIcon />}
          colorScheme="red"
          variant="solid"
          fontWeight="bold"
        >
          ADICIONAR
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default FormularioGrupos;
