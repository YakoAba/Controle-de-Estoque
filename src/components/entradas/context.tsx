import { createContext, useContext, useState } from "react";
import useSWR from "swr";

export interface EntradasContextInterface {
  botoes;
  setBotoes;
  checkedItems;
  setCheckedItems;
  listaEntradas;
  listaEntradasIsLoading;
}

const EntradasContext = createContext<EntradasContextInterface>(
  {} as EntradasContextInterface
);

export const Provider = ({ children }) => {
  const [botoes, setBotoes] = useState({
    a: true,
    e: true,
    d: true,
  });

  const [checkedItems, setCheckedItems] = useState([]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const fetchEntradas = async (url) => {
    const response = await fetch(`/api/entradas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  const { data: listaEntradas, isLoading: listaEntradasIsLoading } = useSWR(
    `/api/entradas`,
    fetchEntradas,
    {
      refreshInterval: 60000, // atualiza a cada 10 segundos
    }
  );

  const value = {
    botoes,
    setBotoes,
    checkedItems,
    setCheckedItems,
    listaEntradas,
    listaEntradasIsLoading,
  };

  return (
    <EntradasContext.Provider value={value}>
      {children}
    </EntradasContext.Provider>
  );
};

export const useEntradasContext = () => useContext(EntradasContext);
