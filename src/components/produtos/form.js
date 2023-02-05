import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const FormularioProdutos = () => {
  const [produto, setProduto] = useState({
    id: "",
    img: "",
    offer: false,
    title: "",
    description: "",
    price: "",
    categoria: "",
  });

  const handleChange = (e) => {
    setProduto({
      ...produto,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Box>
      <SimpleGrid h="fit-content" spacing="6" columns={1}>
        <HStack>
          {produto.img ? (
            <Image
              width="67"
              height="50"
              objectFit="fill"
              src={produto.img}
              alt="LOGO"
            />
          ) : null}
          <Input
            value={produto.img}
            onChange={handleChange}
            placeholder="Url da imagem"
            _placeholder={{ color: "black" }}
            borderColor="black"
            focusBorderColor="#FF2153"
            _hover={{ borderColor: "#FF2153" }}
            mt="10px"
            name="img"
            id="img"
          />
        </HStack>
        <HStack>
          <Checkbox colorScheme="red">Oferta</Checkbox>
        
          <Input
          
            value={produto.price}
            onChange={handleChange}
            placeholder="Preço do produto"
            maxLength={20}
            _placeholder={{ color: "black" }}
            borderColor="black"
            focusBorderColor="#FF2153"
            _hover={{ borderColor: "#FF2153" }}
            name="nameprice"
            id="price"
            type="number"
          />
        </HStack>
        <Input
          value={produto.title}
          onChange={handleChange}
          placeholder="Titulo do produto"
          maxLength={30}
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="#FF2153"
          _hover={{ borderColor: "#FF2153" }}
          name="title"
          id="title"
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
