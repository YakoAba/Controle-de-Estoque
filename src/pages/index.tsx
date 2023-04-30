import Header from "../components/header";
import Form from "../components/produtos/form";
import { Provider } from "../components/produtos/context";

export default function Produtos(): JSX.Element {
  return (
    <Provider>
      <Header titulo={"CLIENTES"}/>
      <Form />
    </Provider>
  );
}
