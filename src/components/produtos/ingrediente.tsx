import { CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { ProdutosClienteClass } from "../../classes/Produtos";
import { useGlobalContext } from "../../contexts/GlobalContext";

function ModalCadProd2() {
  const { disclosureModalProdIngrediente, item, mutate } = useGlobalContext();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleSave = async () => {
    const produto = await ProdutosClienteClass.createInstance(item);
    const operacao = !item._id
      ? await produto.InsertDB(produto)
      : await produto.EditDB(produto);
    mutate();
    disclosureModalProdIngrediente.onClose();
    return { success: true };
  };

  return (
    <>
      <Modal
        isCentered
        scrollBehavior={"outside"}
        blockScrollOnMount={false}
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={disclosureModalProdIngrediente.isOpen}
        onClose={disclosureModalProdIngrediente.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              id="cadastrar"
              p="2"
              h="auto"
              fontSize={18}
              leftIcon={<CheckIcon />}
              colorScheme="red"
              variant="solid"
              onClick={handleSave}
              fontWeight="bold"
              padding="10px 10px"
              mr="10px"
            >
              Salvar
            </Button>
            <Button
              border="2px solid red"
              bgColor="white"
              color={"red"}
              variant="solid"
              padding="8px 16px"
              onClick={disclosureModalProdIngrediente.onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadProd2;
