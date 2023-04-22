import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import { GlobalContextInterface } from "../interfaces/GlobalContext.interface";
import { API_CLIENTES, Sections } from "../config/constants";
import { ClienteClass } from "../classes/ClienteClass";
import { Módulos, clienteModelo } from "../interfaces/interfaces";

const GlobalContext = createContext<GlobalContextInterface>(
  {} as GlobalContextInterface
);

export const Provider = ({ children }) => {
  const disclosureMenu = useDisclosure();
  const disclosureModalProdCad = useDisclosure();
  const disclosureModalProdIngrediente = useDisclosure();

  const [token, setToken] = useState("");
  const [sections] = useState(Sections);
  const [item, setItem] =
    useState<Módulos.ClienteInterface>(clienteModelo);

  const {
    data: listaProdutos,
    isLoading: listaProdutosIsLoading,
    mutate,
  } = useSWR(
    API_CLIENTES,
    async (url) => {
      return await ClienteClass.dbAll();
    },
    {
      refreshInterval: 60000, // atualiza a cada 10 segundos
    }
  );

  const value = {
    disclosureMenu,
    sections,
    mutate,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
