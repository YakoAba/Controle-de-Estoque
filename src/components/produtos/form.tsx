import { AddIcon } from "@chakra-ui/icons";
import Grid from "./grid";
import { Box, Button } from "@chakra-ui/react";
import ModalCadProd from "./modal";
import { useGlobalContext } from "../../contexts/GlobalContext";
import ButtonAdicionar from "../Buttons/adicionar";
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
      <ButtonAdicionar mt={5} onClick={disclosureModalProdCad.onOpen} />
      <Grid data={data} />
    </Box>
  );
};

export default FormularioProdutos;
