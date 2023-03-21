import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

interface ItensContextInterface {
  botoes;
  setBotoes;
  listaItens;
  listaItensIsLoading;
  mutate;
  disclosureModal;
  insert;
}

const ItensContext = createContext<ItensContextInterface>(
  {} as ItensContextInterface
);

const API_ITENS = "/api/itens";

export const Provider = ({ children }) => {
  const [botoes, setBotoes] = useState({
    a: true,
    e: false,
    d: false,
  });

  const disclosureModal = useDisclosure();

  const fetchProdutos = async (url) => {
    const response = await fetch(`/api/itens`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  const {
    data: listaItens,
    isLoading: listaItensIsLoading,
    mutate,
  } = useSWR(API_ITENS, fetchProdutos, {
    refreshInterval: 60000, // atualiza a cada 10 segundos
  });

  useEffect(() => {
    if (listaItens) {
      // Inicializa o estado dos checkboxes com um array de false com o mesmo tamanho do número de ingredientes
      //  setCheckedItems(new Array(listaItens.length).fill(false));
    }
  }, [listaItens]);

  async function insert() {
  //  setItem(produtoModelo);
    setBotoes({ a: true, e: false, d: false });
    disclosureModal.onOpen();
  }

  const value = {
    botoes,
    setBotoes,
    listaItens,
    listaItensIsLoading,
    mutate,
    disclosureModal,
    insert
  };
  return (
    <ItensContext.Provider value={value}>{children}</ItensContext.Provider>
  );
};

export const useItensContext = () => useContext(ItensContext);
