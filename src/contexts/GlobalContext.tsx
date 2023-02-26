import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import { GlobalContextInterface } from "../interfaces/GlobalContext.interface";
import { API_PRODUTOS, Sections } from "../config/constants";
import { ProdutosClienteClass } from "../classes/Produtos";
import { PdvModule, produtoModelo } from "../interfaces/Pdv.interface";

const GlobalContext = createContext<GlobalContextInterface>(
  {} as GlobalContextInterface
);

export const Provider = ({ children }) => {
  const disclosureMenu = useDisclosure();
  const disclosureModalProdCad = useDisclosure();

  const [token, setToken] = useState("");
  const [sections] = useState(Sections);
  const [item, setItem] =
    useState<PdvModule.ProdutosClienteInterface>(produtoModelo);

  const {
    data: listaProdutos,
    isLoading: listaProdutosIsLoading,
    mutate,
  } = useSWR(
    API_PRODUTOS,
    async (url) => {
      return await ProdutosClienteClass.dbAll();
    },
    {
      refreshInterval: 60000, // atualiza a cada 10 segundos
    }
  );

  const value = {
    listaProdutos,
    listaProdutosIsLoading,
    disclosureMenu,
    disclosureModalProdCad,
    token,
    setToken,
    sections,
    mutate,
    item,
    setItem,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
