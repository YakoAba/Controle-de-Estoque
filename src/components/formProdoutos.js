import { Box, Button, Image, Input, SimpleGrid, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const FProdutos = () => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const handleNewProduct = () => {
        if (!name) return;
        if (verifyProductName()) {
          alert("Produto já cadastrado!");
          return;
        }
    
        const id = Math.random().toString(36).substring(2);
        // JSON.stringify([{ id, name, url, titulo, descricao }])
    
        setName("");
        setUrl("");
        setTitulo("");
        setDescricao("");
      };

    return (
        <Box>
            {url?
        <SimpleGrid m="4">
          <Image
            width="67"
            height="50"
            objectFit="fill"
            src={url}
            alt="LOGO"
          />
        </SimpleGrid> : null}
 
      <SimpleGrid h="fit-content" spacing="6" columns={1}>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Url da imagem"
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="#FF2153"
          _hover={{ borderColor: "#FF2153" }}
          mt={"10px"}
        />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do produto"
          maxLength={30}
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="#FF2153"
          _hover={{ borderColor: "#FF2153" }}
        />
        <Input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="titulo do produto"
          maxLength={20}
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="#FF2153"
          _hover={{ borderColor: "#FF2153" }}
        />
        <Textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="descrição do produto"
          _placeholder={{ color: "black" }}
          h="50px"
          borderColor="black"
          focusBorderColor="#FF2153"
          _hover={{ borderColor: "#FF2153" }}
        />
        <Button id="cadastrar">
          CADASTRAR
        </Button>
      </SimpleGrid>
      </Box>
    )
}

export default FProdutos;