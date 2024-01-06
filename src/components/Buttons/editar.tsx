import { EditIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
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

  // const handleConfirm = () => {
  //   onClick();
  //   setIsConfirmationOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsConfirmationOpen(false);
  // };

  return (
    <>
      <Button
        id={`deletar${id}`}
        p="2"
        h="auto"
        fontWeight="bold"
        fontSize={fontSize}
        onClick={() =>    onClick()}
        leftIcon={icon ? <EditIcon /> : null}
        variant="outline"
        colorScheme={colorScheme}
        padding={padding}
        width={width}
        mr={0.5}
        ml={0.5}
      >
        {children}
      </Button>
      {/* <ConfirmationBox
        isOpen={isConfirmationOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirmar edição"
        confirmButtonText="Sim"
        cancelButtonText="Não"
      >
        <p>{`Deseja realmente editar este item "${id}"?`}</p>
      </ConfirmationBox> */}
    </>
  );
};

export default ButtonEditar;
