import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const ButtonAdicionar = ({ mt, onClick, fontSize, padding, width }) => {
  return (
    <Button
      id={`adicionar`}
      p="2"
      h="auto"
      fontSize={fontSize}
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
    >
      ADICIONAR
    </Button>
  );
};

export default ButtonAdicionar;
