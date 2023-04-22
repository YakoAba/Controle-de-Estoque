import Header from "../components/header";
import Form from "../components/cliente/form";
import GridProdutos from "../components/cliente/grid";
import { Provider } from "../components/cliente/context";

export default function Produtos(): JSX.Element {
  return (
    <Provider>
      <Header titulo={"Envio de Cobranças"} />
      <Form />
      <GridProdutos />
    </Provider>
  );
}
