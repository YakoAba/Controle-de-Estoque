import { Provider } from "../components/entradas/context";
import { Provider as ProviderFornecedor } from "../components/fornecedores/context";
import Form from "../components/entradas/form";
import Grid from "../components/entradas/grid";
import Header from "../components/header";

const Entrada = () => {
  return (
    <Provider>
      <ProviderFornecedor>
        <Header titulo={"ENTRADAS"} />
        <F'orm />
        <Grid />
      </ProviderFornecedor>
    </Provider>
  );
};
export default Entrada;
