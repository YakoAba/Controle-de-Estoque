import Header from "../components/header";
import Form from "../components/produtos/form";
import GridProdutos from "../components/produtos/grid";
import { Provider } from "../components/produtos/context";

export default function Produtos(): JSX.Element {
  return (
    <Provider>
      <Header titulo={"PRODUTOS"}/>
      <Form />
      <GridProdutos />
    </Provider>
  );
}
