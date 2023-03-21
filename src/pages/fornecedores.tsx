import Header from "../components/header";
import Grid from "../components/fornecedores/grid";
import Form from "../components/fornecedores/form";
import { Provider } from "../components/fornecedores/context";


const Fornecedores = () => {
  return (
    <Provider>
      <Header titulo={"FORNECEDORES"}/>
      <Form />
      <Grid />
    </Provider>
  );
};

export default Fornecedores;
