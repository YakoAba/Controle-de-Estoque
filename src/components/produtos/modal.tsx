import {  CheckIcon } from "@chakra-ui/icons";
import {
  Button,
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
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { PdvModule } from "../../interfaces/Pdv.interface";

function ModalCadProd() {
  const { disclosureModalProdCad } = useGlobalContext();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [item, setItem] = useState({ venda: {} } as PdvModule.ProdutosInterface);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.id]: e.target.value.image,
    });
  };
  const handleImage = (e) => {
    setItem({ ...item, image: e.target.value });
  };
  return (
    <>
      <Modal
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
              h="70px"
              mx="auto"
              px="2"
              py="2"
              align="center"
              boxShadow="0 1px 0 #ccc"
              color="black"
              fontWeight="bold"
              //sx={{ position: "fixed", top: 0, left: 0, right: 0 }}
            >
              <Image
                width="67"
                height="50"
                objectFit="fill"
                src="harmonica_cozinha.png"
                alt="LOGO"
              />
              <Flex ml={5}>
                <HStack>
                  <Text>Cadastro de Produtos</Text>
                </HStack>
              </Flex>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
                  // onChange={handleChange}
                  placeholder="Preço do produto"
                  maxLength={20}
                  _placeholder={{ color: "black" }}
                  borderColor="black"
                  focusBorderColor="red"
                  _hover={{ borderColor: "red" }}
                  name="price"
                  id="price"
                  type="number"
                />
              </HStack>
              <Input
                // value={produto.title}
                // onChange={handleChange}
                placeholder="Titulo do produto"
                maxLength={30}
                _placeholder={{ color: "black" }}
                borderColor="black"
                focusBorderColor="red"
                _hover={{ borderColor: "red" }}
                name="title"
                id="title"
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
              fontWeight="bold"
              onClick={() => {
                alert(JSON.stringify(item));
              }}
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
