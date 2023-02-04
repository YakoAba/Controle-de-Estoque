import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Image,
  Input,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const FormularioProdutos = () => {
  const [produto, setProduto] = useState({
    name: "",
    url: "",
    titulo: "",
    descricao: "",
  });

  const handleChange = (e) => {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      {produto.url ? (
        <SimpleGrid m="4">
          <Image width="67" height="50" objectFit="fill" src={url} alt="LOGO" />
        </SimpleGrid>
      ) : null}

      <SimpleGrid h="fit-content" spacing="6" columns={1}>
        <Input
          value={produto.url}
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
          value={produto.name}
          onChange={handleChange}
          placeholder="Nome do produto"
          maxLength={30}
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="#FF2153"
          _hover={{ borderColor: "#FF2153" }}
          name="name"
          id="name"
        />
        <Input
          value={produto.titulo}
          onChange={handleChange}
          placeholder="Título do produto"
          maxLength={20}
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="#FF2153"
          _hover={{ borderColor: "#FF2153" }}
          name="titulo"
          id="titulo"
        />
        <Textarea
          value={produto.descricao}
          onChange={handleChange}
          placeholder="Descrição do produto"
          _placeholder={{ color: "black" }}
          h="50px"
          borderColor="black"
          focusBorderColor="#FF2153"
          _hover={{ borderColor: "#FF2153" }}
          id="descricao"
          name="descricao"
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

export default FormularioProdutos;
