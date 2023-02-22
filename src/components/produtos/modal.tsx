import { CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  calc,
  Checkbox,
  Flex,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ProdutosClienteClass } from "../../classes/Produtos";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { PdvModule, produtoModelo } from "../../interfaces/Pdv.interface";

function ModalCadProd() {
  const { disclosureModalProdCad } = useGlobalContext();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [item, setItem] =
    useState<PdvModule.ProdutosClienteInterface>(produtoModelo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id.includes("venda")) {
      setItem((item) => ({
        ...item,
        venda: { ...item.venda, [id.replace("venda.", "")]: parseFloat(value) },
      }));
    } else {
      setItem((item) => ({ ...item, [id]: value }));
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem((item) => ({ ...item, image: e.target.value }));
  };

  const handleSave = async () => {
    const produto = await ProdutosClienteClass.createInstance(item);
    return await produto.InsertDB(produto);
  };

  return (
    <>
      <Modal
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
                width="54"
                height="41"
                objectFit="fill"
                src="harmonica cozinha.svg"
                alt="LOGO"
              />
              <Flex ml={-54} justifyContent={"center"} w={"100vw"}>
              <Text >Cadastro de Produtos</Text>
              </Flex>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Produto</Tab>
                <Tab>Venda</Tab>
                <Tab>Ingredientes</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SimpleGrid h="fit-content" spacing="6" columns={1}>
                    <HStack>
                      {item.image ? (
                        <Image
                          width="67"
                          height="50"
                          objectFit="fill"
                          src={item.image}
                          alt="LOGO"
                        />
                      ) : null}
                      <Input
                        onChange={handleImage}
                        value={item.image}
                        placeholder="Url da imagem"
                        _placeholder={{ color: "black" }}
                        borderColor="black"
                        focusBorderColor="red"
                        _hover={{ borderColor: "red" }}
                        mt="10px"
                        name="img"
                        id="img"
                      />
                    </HStack>
                    <HStack>
                      <Checkbox colorScheme="red">Oferta</Checkbox>
                      <Input
                        value={item.venda.bruto}
                        onChange={handleChange}
                        placeholder="Preço do produto"
                        maxLength={20}
                        _placeholder={{ color: "black" }}
                        borderColor="black"
                        focusBorderColor="red"
                        _hover={{ borderColor: "red" }}
                        name="venda.bruto"
                        id="venda.bruto"
                        type="number"
                      />
                    </HStack>
                    <Input
                      value={item.nome}
                      onChange={handleChange}
                      placeholder="Titulo do produto"
                      maxLength={30}
                      _placeholder={{ color: "black" }}
                      borderColor="black"
                      focusBorderColor="red"
                      _hover={{ borderColor: "red" }}
                      name="nome"
                      id="nome"
                    />
                    <Textarea
                      //value={produto.description}
                      // onChange={handleChange}
                      placeholder="Descrição do produto"
                      _placeholder={{ color: "black" }}
                      h="50px"
                      borderColor="black"
                      focusBorderColor="red"
                      _hover={{ borderColor: "red" }}
                      id="descricao"
                      name="descricao"
                    />
                  </SimpleGrid>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
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
            >
              Salvar
            </Button>
            <Button onClick={disclosureModalProdCad.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadProd;
