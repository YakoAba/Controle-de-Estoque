import { ProdutosServidorClass } from "../classes/Produtos.Cliente";
import Header from "../components/Header";
import Form from "../components/produtos/form";

export default function Produtos({ data }): JSX.Element {
  return (
    <>
      <Header />
      <Form data={data}/>
    </>
  );
}

export async function getServerSideProps() {
  try {
    // Pass data to the page via props
    const data = await ProdutosServidorClass.DbAllJson();
    return { props: { data } };
  } catch (error) {
    return { props: { error } };
  }
}
