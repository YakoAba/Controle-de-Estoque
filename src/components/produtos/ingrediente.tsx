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
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ProdutosClass } from "../../classes/produtos";
import { useGlobalContext } from "../../contexts/GlobalContext";
import BrazilianRealInput from "../BrazilianRealInput";
import InputKg from "../inputKg";
import NumeroInput from "../inputNumero";

function ModalCadProd2() {
  const {
    listaProdutos,
    listaProdutosIsLoading,
    disclosureModalProdIngrediente,
    item,
    mutate,
  } = useGlobalContext();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");
  const [produtoNome, setProdutoNome] = useState("");
  const [produtoUnidade, setProdutoUnidade] = useState("");
  const [produtoValor, setProdutoValor] = useState("");
  const [produtoQuantidade, setProdutoQuantidade] = useState("");
  const [produtoPeso, setProdutoPeso] = useState("");
  const [produtoQuantidadeValor, setProdutoQuantidadeValor] = useState("");

  const handleSave = async () => {
    const produto = await ProdutosClass.createInstance(item);
    const operacao = !item._id
      ? await produto.dbInsert(produto)
      : await produto.dbEdit(produto);
    mutate();
    disclosureModalProdIngrediente.onClose();
    return { success: true };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode enviar os dados para o servidor
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
                src="harmonica_cozinha.svg"
                alt="LOGO"
              />
              <Flex ml={-46} justifyContent={"center"} w={"100vw"}>
                <Text>
                  {!item._id ? `Cadastro` : `Alteração`} de Ingredientes
                </Text>
              </Flex>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>Quantidade</Text>
              <NumeroInput value={0} onChange={() => {}} id={""} />
            </Stack>
            <Stack>
              <Text>Valor</Text>
              <BrazilianRealInput value={0} onChange={() => {}} id={""} />
            </Stack>
            <Select value={item._id} onChange={() => {}}>
              <option value="0">Selecione um item</option>
              {item &&
                item.ingredientes.length > 0 &&
                item.ingredientes.map((iitem, i) => (
                  <option key={i} value={iitem.nome}>
                    {iitem.nome}
                  </option>
                ))}
            </Select>
            {/* <label>
                Valor:
                <input
                  type="number"
                  value={valor}
                  onChange={(event) => setValor(event.target.value)}
                />
              </label> */}
            <br />
            <label>
              Produto - Nome:
              <input
                type="text"
                value={produtoNome}
                onChange={(event) => setProdutoNome(event.target.value)}
              />
            </label>
            <br />
            <label>
              Produto - Unidade:
              <input
                type="text"
                value={produtoUnidade}
                onChange={(event) => setProdutoUnidade(event.target.value)}
              />
            </label>
            <br />
            <label>
              Produto - Valor:
              <input
                type="number"
                value={produtoValor}
                onChange={(event) => setProdutoValor(event.target.value)}
              />
            </label>
            <br />
            <label>
              Produto - Quantidade:
              <input
                type="number"
                value={produtoQuantidade}
                onChange={(event) => setProdutoQuantidade(event.target.value)}
              />
            </label>
            <br />
            <label>
              Produto - Peso:
              <input
                type="number"
                value={produtoPeso}
                onChange={(event) => setProdutoPeso(event.target.value)}
              />
            </label>
            <br />
            <label>
              Produto - Valor por Quantidade:
              <input
                type="number"
                value={produtoQuantidadeValor}
                onChange={(event) =>
                  setProdutoQuantidadeValor(event.target.value)
                }
              />
            </label>
            <br />
            <button type="submit">Enviar</button>d
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
