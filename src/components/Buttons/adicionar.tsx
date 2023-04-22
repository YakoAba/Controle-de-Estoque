import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

interface ButtonAdicionarProps {
  mt?: number;
  onClick?: () => void;
  fontSize?: string;
  padding?: string;
  width?: string;
}

const ButtonAdicionar = ({ mt, onClick, fontSize, padding, width }:ButtonAdicionarProps)  => {
  return (
    <Button
      id= "adicionar"
      p="2"
      h="auto"
      fontSize={parseInt(fontSize)}
      leftIcon={<AddIcon />}
      colorScheme="blue"
      variant="solid"
      fontWeight="bold"
      mt={mt}
      mr={0.5}
      ml={0.5}
      onClick={onClick}
      padding={padding}
      width={width}
      borderRadius={25}
    >
      Adicionar
    </Button>
  );
};

export default ButtonAdicionar;
