import { AddIcon } from "@chakra-ui/icons";
import Grid from "./grid";
import { Box, Button } from "@chakra-ui/react";
import ModalCadProd from "./modal";
import { useGlobalContext } from "../../contexts/GlobalContext";
const FormularioProdutos = ({ data }) => {
  const { disclosureModalProdCad } = useGlobalContext();

  return (
    <Box
      overflowY="auto"
      width="100vw"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
      height="calc(100vh - 90px)"
      marginTop={20}
      marginLeft="auto"
      marginRight="auto"
      paddingLeft="6"
      paddingRight="6"
    >
      <ModalCadProd />
      <Button
        id={`cadastrar`}
        p="2"
        h="auto"
        fontSize={18}
        leftIcon={<AddIcon />}
        colorScheme="red"
        variant="solid"
        fontWeight="bold"
        onClick={disclosureModalProdCad.onOpen}
        mt={5}
      >
        ADICIONAR
      </Button>
      <Grid data={data} />
    </Box>
  );
};

export default FormularioProdutos;
