import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { ConfirmationBox } from "../caixaConfirmacao";

const ButtonDeletar = ({ onClick, id }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleConfirm = () => {
    onClick();
    setIsConfirmationOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <>
      <Button
        id={`deletar${id}`}
        p="2"
        h="auto"
        fontSize={11}
        onClick={() => setIsConfirmationOpen(true)}
        leftIcon={<DeleteIcon />}
        ml={2}
        border="2px solid red"
        bgColor="white"
        color={"red"}
        variant="solid"
        padding= "8px 14px"
      >
        EDITAR
      </Button>
      <ConfirmationBox
        isOpen={isConfirmationOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirmar edição"
        confirmButtonText="Sim"
        cancelButtonText="Não"
      >
        <p>{`Deseja realmente editar este item? id:"${id}"`}</p>
      </ConfirmationBox>
    </>
  );
};

export default ButtonDeletar;
