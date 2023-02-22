import { ProdutosServidorClass } from "../classes/produto.servidor.class";
import { ProdutosClienteClass } from "../classes/Produtos";
import Header from "../components/Header";
import Form from "../components/produtos/form";
import useSWR from "swr";

export default function Produtos(): JSX.Element {


  return (
    <>
      <Header />
      <Form/>
    </>
  );
}
