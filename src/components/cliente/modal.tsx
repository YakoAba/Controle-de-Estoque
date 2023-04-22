import { CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
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
import { useClienteContext } from "./context";
import Tab1 from "./tab1";

function ModalCadProd() {
  const { disclosureModalClienteCadastro, handleSave, cliente } = useClienteContext();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const fechar = () => {
        disclosureModalClienteCadastro.onClose;
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
        isOpen={disclosureModalClienteCadastro.isOpen}
        onClose={fechar}
      >
        <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Flex mx="auto" px="2" py="2" align="center" boxShadow="0 1px 0 #ccc" color="black" fontWeight="bold">
                <Flex ml={-46} justifyContent={"center"} w={"100vw"}>
                  <Text>{!cliente.id ? `Cadastro` : `Alteração`} de Mensagem</Text>
                </Flex>
              </Flex>
            </ModalHeader>
            <ModalBody>
              <Tabs maxHeight={"380px"} minHeight={"380px"}>
                <TabList>
                  <Tab>MENSAGEM</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Tab1 />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
          <ModalFooter mt={"20px"}>
            <Button
              id="cadastrar"
              p="2"
              h="auto"
              fontSize={18}
              leftIcon={<CheckIcon />}
              colorScheme="blue"
              variant="solid"
              onClick={handleSave}
              fontWeight="bold"
              padding="10px 10px"
              mr="10px"
            >
              Enviar
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              padding="8px 16px"
              onClick={disclosureModalClienteCadastro.onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadProd;
