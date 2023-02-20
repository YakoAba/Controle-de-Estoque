import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const ButtonDeletar = ({ onClick, id }) => {
  return (
    <Button
      id={`deletar${id}`}
      p="2"
      h="auto"
      fontSize={11}
      onClick={onClick}
      leftIcon={<DeleteIcon />}
      colorScheme="red"
      variant="solid"
    >
      DELETAR
    </Button>
  );
};

export default ButtonDeletar;
