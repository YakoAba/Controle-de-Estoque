import { AddIcon } from "@chakra-ui/icons";
import { useGlobalContext } from "../../contexts/GlobalContext";
import Grid from "./grid";
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
import { ItemInterface } from "../../interfaces/Categorias.interface";


const FormularioProdutos = () => {
  const { listaProdutos, listaProdutosIsLoading } = useGlobalContext();
  const [item, setItem] = useState({} as ItemInterface);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.id]: e.target.value,
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
    <SimpleGrid h="fit-content" spacing="6" columns={1}>
      <HStack>
        {(item as ItemInterface).imagePath
 ? (
          <Image
            width="67"
            height="50"
            objectFit="fill"
            src={(item as ItemInterface).imagePath}
            alt="LOGO"
          />
        ) : null}
        <Input
          value={(item as ItemInterface).imagePath}
          onChange={handleChange}
          placeholder="Url da imagem"
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="red"
          _hover={{ borderColor: "red" }}
          mt="10px"
          name="img"
          id="img"
        />
      </HStack>
      {/* <HStack>
        <Checkbox colorScheme="red">Oferta</Checkbox>
        <Input
          value={produto.price}
          onChange={handleChange}
          placeholder="Preço do produto"
          maxLength={20}
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="red"
          _hover={{ borderColor: "red" }}
          name="price"
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
        focusBorderColor="red"
        _hover={{ borderColor: "red" }}
        name="title"
        id="title"
      />
      <Textarea
        value={produto.description}
        onChange={handleChange}
        placeholder="Descrição do produto"
        _placeholder={{ color: "black" }}
        h="50px"
        borderColor="black"
        focusBorderColor="red"
        _hover={{ borderColor: "red" }}
        id="descricao"
        name="descricao"
      /> */}

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

    <Grid data={listaProdutos} isLoading={listaProdutosIsLoading} />
    </Box>
  );
};

export default FormularioProdutos;
