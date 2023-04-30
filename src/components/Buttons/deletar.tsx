import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { ConfirmationBox } from "../caixaConfirmacao";
interface ButtonDeletarProps {
  children: ReactNode;
  id: string;
  fontSize: number;
  padding: string;
  onClick: () => void;
  icon: boolean;
  width: string;
}

const ButtonDeletar = ({
  children,
  onClick,
  id,
  fontSize,
  padding,
  icon,
  width,
}: ButtonDeletarProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleConfirm = () => {
    onClick();
    setIsConfirmationOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };

  function ComIcon() {
    return (
      <Button
        id={`deletar${id}`}
        p="2"
        h="auto"
        fontWeight="bold"
        fontSize={fontSize}
        onClick={() => setIsConfirmationOpen(true)}
        leftIcon={<DeleteIcon />}
        colorScheme="blue"
        variant="solid"
        padding={padding}
        width={width}
        mr={0.5}
        ml={0.5}
      >
        {children}
      </Button>
    );
  }

  function SemIcon() {
    return (
      <Button
        id={`deletar${id}`}
        h="auto"
        fontSize={fontSize}
        onClick={() => setIsConfirmationOpen(true)}
        colorScheme="red"
        variant="solid"
        padding={padding}
      >
        {children}
      </Button>
    );
  }

  return (
    <>
      {icon ? <ComIcon /> : <SemIcon />}
      <ConfirmationBox
        isOpen={isConfirmationOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirmar exclusão"
        confirmButtonText="Sim"
        cancelButtonText="Não"
      >
        <p>{`Deseja realmente excluir este item? ${id}`}</p>
      </ConfirmationBox>
    </>
  );
};

export default ButtonDeletar;
