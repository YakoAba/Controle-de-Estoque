import Header from "../components/header";
import Form from "../components/profissionais/form";
import Grid from "../components/profissionais/grid";
import { Provider } from "../components/profissionais/context";
import { ProviderServico } from "../components/servicos/context";

export default function Produtos(): JSX.Element {
  return (
    <ProviderServico>
    <Provider>
      <Header titulo={"PROFISSIONAIS"}/>
      <Form />
      <Grid />
    </Provider>
    </ProviderServico>
  );
}
