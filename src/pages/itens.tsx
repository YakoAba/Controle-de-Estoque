import Header from "../components/header";
import Form from "../components/itens/form";
import GridItens from "../components/itens/grid";
import { Provider } from "../components/itens/context";

export default function Itens(): JSX.Element {
  return (
    <Provider>
      <Header titulo={"ITENS"}/>
      <Form />
      <GridItens />
    </Provider>
  );
}
