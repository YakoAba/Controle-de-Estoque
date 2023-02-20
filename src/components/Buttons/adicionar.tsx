import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const ButtonAdicionar = ({mt,onClick}) => {
   return (
    <Button
      id={`adicionar`}
      p="2"
      h="auto"
      fontSize={15}
      leftIcon={<AddIcon />}
      colorScheme="red"
      variant="solid"
      fontWeight="bold"
      mt={mt}
      onClick={onClick}
    >
      ADICIONAR
    </Button>
  );
};

export default ButtonAdicionar;
