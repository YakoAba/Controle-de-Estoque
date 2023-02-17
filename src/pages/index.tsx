import { ProdutosPdvClass } from "../classes/Pdv.class";
import Header from "../components/Header";
import Form from "../components/produtos/form";

export default function Produtos({data}): JSX.Element {
  
  return (
    <>
      <Header />
      <Form data={data} />
    </>
  );
}

export async function getServerSideProps() {
  // Pass data to the page via props
  const data = JSON.stringify(await new ProdutosPdvClass().DbAll());
  return { props: { data } };
}
