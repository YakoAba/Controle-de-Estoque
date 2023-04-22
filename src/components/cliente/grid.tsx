import {
  Box,
  Checkbox,
  HStack,
  Show,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useClienteContext } from "./context";
import { PdvModule } from "../../interfaces/Pdv.interface";
import PacMan from "../pacman";

function GridProdutos(): JSX.Element {
  // const toast = useToast();
  const {
    listaClientes,
    listaClientesIsLoading,
    handleCheckAll,
    handleCheck,
    // isIndeterminate,
    // allChecked,
    // checkedItems,
  } = useClienteContext();

  // function toastDeletar() {
  //   return toast({
  //     title: "Produto excluido!",
  //     description: "Excluimos o produto para você.",
  //     status: "success",
  //     duration: 5000,
  //     isClosable: true,
  //     position: "top",
  //   });
  // }

  const renderGrid = () => {
    return <></>
    //  listaProdutos.json.map((item: PdvModule.ProdutosInterface, i) => (
    //   <Tr key={i}>
    //     <Td color="black">
    //       <HStack>
    //         <Checkbox
    //           colorScheme={"blue"}
    //           isChecked={checkedItems[i]}
    //           // onChange={(e) => handleCheck(e, i)}
    //           mr={3}
    //           borderColor={"black"}
    //           size={"lg"}
    //         />
    //         <Text id={item._id}>{item.nome}</Text>
    //       </HStack>
    //     </Td>
    //     <Td color="black" >
    //       {item.telefone}
    //     </Td>
    //     <Show above={"sm"}>
    //       <Td color="black">
    //         {item.descricao}
    //       </Td>
    //     </Show>
    //   </Tr>
    // ));
  };

  return false ? (
    <PacMan />
  ) : (
    <Box
      overflowY="auto"
      maxW={"90%"}
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
      marginLeft="auto"
      marginRight="auto"
    >
      <Table marginTop={"25px"} colorScheme="black" maxW={"100%"}>
        <Thead>
          <Tr>
            <Th w="20%" fontWeight="bold" fontSize="14px">
              <HStack>
                <Checkbox
                  colorScheme={"blue"}
                  mr={3}
                  // isChecked={allChecked}
                  // isIndeterminate={isIndeterminate}
                  // onChange={handleCheckAll}
                  borderColor={"black"}
                  size={"lg"}
                  
                />
                <Text>Nome:</Text>
              </HStack>
            </Th>
            <Th w="20%" color="black" >
              Número:
            </Th>
            <Show above={"sm"}>
              <Th w="60%" color="black" >
                Mensagem
              </Th>
            </Show>
          </Tr>
        </Thead>
        <Tbody>{renderGrid()}</Tbody>
      </Table>
    </Box>
  );
}

export default GridProdutos;
