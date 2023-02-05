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

// const modelo =
//   '{"_id":{"$oid":"62a44d910b453292365eeb65"},' +
//   '"id":{"$numberInt":"25"},' +
//   '"img":"https://i.imgur.com/WAxO3sQ.png",' +
//   '"offer":true,' +
//   '"title":"Pizza 01",' +
//   '"description":"Pão, maionese, 2 carnes de 180g, alface, tomate, bacon e cebola roxa",' +
//   '"price":{"$numberInt":"37"},' +
//   '"categoria":"Pizzas"}';

const currencyFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

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
    let inputValue = e.target.value;
    let commaCount = (inputValue.match(/,/g) || []).length;
    if(commaCount > 1) return;
    inputValue = inputValue.replace(/[^0-9,]+/g, "");
    setProduto({
      ...produto,
      [e.target.id]: inputValue,
    });
  };

  const handleBlur = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(",", ".");
    let newValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(inputValue);
    setProduto({
      ...produto,
      price: newValue,
    });
  };

  const handleFocus = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9,]+/g, "");
    inputValue = inputValue.replace(".00", "");
    setProduto({
      ...produto,
      [e.target.id]: inputValue,
    });
  };

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

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
            onBlur={handleBlur}
            onFocus={handleFocus}
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