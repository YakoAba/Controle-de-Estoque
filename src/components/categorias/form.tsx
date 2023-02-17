import { AddIcon } from "@chakra-ui/icons";
import Grid from "./grid";
import { Box, Button, Image, Input, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";

const FormularioGrupos = () => {

  const [categoria, setCategoria] = useState({
    nome: "",
    url: "",
  });

  const handleChange = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      overflowY="auto"
      width="100vw"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
      height="calc(100vh - 90px)"
      marginTop={20}
      marginLeft="auto"
      marginRight="auto"
      paddingLeft="6"
      paddingRight="6"
    >
      {categoria.url ? (
        <SimpleGrid m="4">
          <Image
            width="67"
            height="50"
            objectFit="fill"
            src={categoria.url}
            alt="LOGO"
          />
        </SimpleGrid>
      ) : null}

      <SimpleGrid h="fit-content" spacing="6" columns={1}>
        <Input
          value={categoria.url}
          onChange={handleChange}
          placeholder="Url da imagem"
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="red"
          _hover={{ borderColor: "red" }}
          mt="10px"
          name="url"
          id="url"
        />
        <Input
          value={categoria.nome}
          onChange={handleChange}
          placeholder="Nome do grupo"
          maxLength={30}
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="red"
          _hover={{ borderColor: "red" }}
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
     {/* <Grid  /> */}
    </Box>
  );
};

export default FormularioGrupos;
