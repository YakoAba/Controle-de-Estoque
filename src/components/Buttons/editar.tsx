import { EditIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { Children, ReactNode, useState } from "react";
import { ConfirmationBox } from "../caixaConfirmacao";

interface ButtonEditarProps {
  children: ReactNode;
  id: string;
  fontSize: number;
  padding: string;
  onClick: () => void;
  icon: boolean;
  colorScheme: string;
  width: string;
}

const ButtonEditar = ({
  onClick,
  id,
  fontSize,
  padding,
  children,
  icon,
  colorScheme,
  width,
}: ButtonEditarProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleConfirm = () => {
    onClick();
    setIsConfirmationOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };

  function ComIcone() {
    return (
      <Button
        id={`deletar${id}`}
        p="2"
        h="auto"
        fontWeight="bold"
        fontSize={fontSize}
        onClick={() => setIsConfirmationOpen(true)}
        leftIcon={<EditIcon />}
        border="2px solid red"
        bgColor="white"
        color={"red"}
        variant="solid"
        colorScheme={colorScheme}
        padding={padding}
        width={width}
        mr={0.5}
        ml={0.5}
      >
        {children}
      </Button>
    );
  }

  function SemIcone() {
    return (
      <Button
        id={`deletar${id}`}
        h="auto"
        fontSize={fontSize}
        onClick={() => setIsConfirmationOpen(true)}
        border="2px solid red"
        bgColor="white"
        color={"red"}
        variant="solid"
        colorScheme={colorScheme}
        padding={padding}
        width={width}
      >
        {children}
      </Button>
    );
  }

  return (
    <>
      {icon ? <ComIcone /> : <SemIcone />}
      <ConfirmationBox
        isOpen={isConfirmationOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirmar edição"
        confirmButtonText="Sim"
        cancelButtonText="Não"
      >
        <p>{`Deseja realmente editar este item "${id}"?`}</p>
      </ConfirmationBox>
    </>
  );
};

export default ButtonEditar;
