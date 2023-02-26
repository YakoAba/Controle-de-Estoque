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
import Tab1 from "./tab1";
import Tab2 from "./tab2";
import Tab3 from "./tab3";

function ModalCadProd() {
  const { disclosureModalProdCad, item } = useGlobalContext();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { mutate } = useGlobalContext();

  const handleSave = async () => {
    const produto = await ProdutosClienteClass.createInstance(item);
    await produto.InsertDB(produto);
    mutate();
    disclosureModalProdCad.onClose();
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
        isOpen={disclosureModalProdCad.isOpen}
        onClose={disclosureModalProdCad.onClose}
      >
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
                src="harmonica cozinha.svg"
                alt="LOGO"
              />
              <Flex ml={-46} justifyContent={"center"} w={"100vw"}>
                <Text>Cadastro de Produtos</Text>
              </Flex>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs maxHeight={"65vh"}  minHeight={"65vh"} >
              <TabList >
                <Tab>Produto</Tab>
                <Tab>Venda</Tab>
                <Tab>Ingredientes</Tab>
              </TabList>
              <TabPanels >
                <TabPanel >
                  <Tab1 />
                </TabPanel>
                <TabPanel>
                  <Tab2 />
                </TabPanel>
                <TabPanel >
                  <Tab3 />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
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
