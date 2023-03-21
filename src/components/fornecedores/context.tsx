import { createContext, useContext, useState } from "react";
import useSWR from "swr";

export interface FornecedorContextInterface {
  botoes;
  setBotoes;
  checkedItems;
  setCheckedItems;
  listaFornecedores;
  listaFornecedoresIsLoading;
}

interface FornecedorInterface {
  _id: string;
  nome: string;
}

const FornecedorContext = createContext<FornecedorContextInterface>(
  {} as FornecedorContextInterface
);

export const Provider = ({ children }) => {
  
  const [botoes, setBotoes] = useState({
    a: true,
    e: false,
    d: false,
  });

  const [fornecedor, setFornecedor] = useState({} as FornecedorInterface);
  const [checkedItems, setCheckedItems] = useState([]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const fetchFornecedores = async (url) => {
    const response = await fetch(`/api/fornecedores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  const { data: listaFornecedores, isLoading: listaFornecedoresIsLoading } =
    useSWR(`/api/fornecedores`, fetchFornecedores, {
      refreshInterval: 60000, // atualiza a cada 10 segundos
    });

  const value = {
    botoes,
    setBotoes,
    checkedItems,
    setCheckedItems,
    listaFornecedores,
    listaFornecedoresIsLoading,
  };

  return (
    <FornecedorContext.Provider value={value}>
      {children}
    </FornecedorContext.Provider>
  );
};

export const useFornecedorContext = () => useContext(FornecedorContext);
