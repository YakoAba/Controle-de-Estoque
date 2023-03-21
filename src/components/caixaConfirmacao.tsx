import { ReactNode } from "react";
import {
  Button,
  ButtonProps,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react";

interface ConfirmationBoxProps {
  children: ReactNode;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  modalProps?: ModalProps;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

export const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({
  onConfirm,
  onCancel,
  isOpen,
  title,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
  children,
}) => {
  const { onClose } = useDisclosure();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex
            maxHeight={"45px"}
            mx="auto"
            px="2"
            py="2"
            align="center"
            boxShadow="0 1px 0 #ccc"
            color="black"
            fontWeight="bold"
          >
            <Image
              width="46"
              height="37"
              objectFit="fill"
              src="harmonica_cozinha.svg"
              alt="LOGO"
              mr={3}
            />
            {title}
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleConfirm}>
            {confirmButtonText}
          </Button>
          <Button colorScheme="red" variant="outline" onClick={handleCancel}>
            {cancelButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
