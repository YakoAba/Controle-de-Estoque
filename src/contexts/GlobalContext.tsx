import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
// import useSWR from "swr";
import { GlobalContextInterface } from "../interfaces/GlobalContext.interface";
// import { API_CATEGORIAS, API_PRODUTOS, Sections } from "../config/constants";
import { Sections } from "../config/constants";
const GlobalContext = createContext<GlobalContextInterface>(
  {} as GlobalContextInterface
);

export const Provider = ({ children }) => {
  const disclosureMenu = useDisclosure();
  const disclosureModalProdCad = useDisclosure();

  const [token, setToken] = useState("");
  const [sections] = useState(Sections);

  // const { data: listaCategorias, isLoading: listaCategoriasIsLoading } = useSWR(
  //   API_CATEGORIAS,
  //   async (url) => {
  //     const res = await fetch(url);
  //     return res.json();
  //   }
  // );

  // const { data: listaProdutos, isLoading: listaProdutosIsLoading } = useSWR(
  //   API_PRODUTOS,
  //   async (url) => {
  //     const res = await fetch(url);
  //     return res.json();
  //   }
  // );

  const value = {
    disclosureMenu,
    disclosureModalProdCad,
    token,
    setToken,
    sections,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
