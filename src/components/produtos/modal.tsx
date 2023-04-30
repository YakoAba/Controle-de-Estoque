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
import { useProdutoContext } from "./context";
import Tab1 from "./tab1";
import Tab2 from "./tab2";
import Tab3 from "./tab3";

function ModalCadProd() {
  const { disclosureModalProdCad, handleSave, item } = useProdutoContext();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const fechar = () => {
    disclosureModalProdCad.onClose;
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
        isOpen={disclosureModalProdCad.isOpen}
        onClose={fechar}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex
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
               // src="harmonica_cozinha.svg"
                alt="LOGO"
              />
              <Flex ml={-46} justifyContent={"center"} w={"100vw"}>
                <Text>{!item._id ? `Cadastro` : `Alteração`} de Clientes</Text>
              </Flex>
            </Flex>
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Tabs maxHeight={"380px"} minHeight={"380px"}>
              <TabList>
                <Tab>Cliente</Tab>
                <Tab>Propostas</Tab>
                <Tab>Importações</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Tab1 />
                </TabPanel>
                <TabPanel>
                  <Tab2 />
                </TabPanel>
                <TabPanel>
                  <Tab3 />
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
              Salvar
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              padding="8px 16px"
              onClick={disclosureModalProdCad.onClose}
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
