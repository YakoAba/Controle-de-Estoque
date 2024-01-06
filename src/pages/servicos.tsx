import Header from "../components/header";
import Form from "../components/servicos/form";
import Grid from "../components/servicos/grid";
import { ProviderServico } from "../components/servicos/context";

export default function Produtos(): JSX.Element {
  return (
    <ProviderServico>
      <Header titulo={"SERVICOS"}/>
      <Form />
      <Grid />
    </ProviderServico>
  );
}
