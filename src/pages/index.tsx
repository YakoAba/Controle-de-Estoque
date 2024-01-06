import Header from "../components/header";
import Form from "../components/clientes/form";
import GridClientes from "../components/clientes/grid";
import { Provider } from "../components/clientes/context";

export default function Produtos(): JSX.Element {
  return (
    <Provider>
      <Header titulo={"CLIENTES"}/>
      <Form />
      <GridClientes />
    </Provider>
  );
}
