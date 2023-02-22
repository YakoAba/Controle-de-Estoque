
import Grid from "./grid";
import { Box } from "@chakra-ui/react";
import ModalCadProd from "./modal";
import { useGlobalContext } from "../../contexts/GlobalContext";
import ButtonAdicionar from "../Buttons/adicionar";
const FormularioProdutos = () => {
  const { disclosureModalProdCad } = useGlobalContext();

  return (
    <Box
      overflowY="auto"
      width="100%"
      maxW={"100%"}
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
      height="calc(100vh - 90px)"
      marginTop={20}
      marginLeft="auto"
      marginRight="auto"
      paddingLeft="3"
      paddingRight="3"
    >
      <ModalCadProd />
      <ButtonAdicionar mt={5} onClick={disclosureModalProdCad.onOpen} />
      <Grid />
    </Box>
  );
};

export default FormularioProdutos;
