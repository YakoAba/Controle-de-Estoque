import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import useSWR from "swr";
import { ProfissionaisClass } from "../../classes/profissionais";
import { API_PROFISSIONAIS, modelosBotoes } from "../../config/constants";
import { profissionalModelo, Module } from "../../interfaces/Pdv.interface";

// Interface para o contexto do Profissional
export interface ProfissionalContextInterface {
  listaProfissionais: any;
  listaProfissionaisIsLoading: boolean;
  mutate();
  item: Module.ProfissionaisInterface;
  setItem: Dispatch<SetStateAction<Module.ProfissionaisInterface>>;
  botoes: typeof modelosBotoes;
  setBotoes: Dispatch<SetStateAction<typeof modelosBotoes>>;
  handleCheckAll: (event: any) => void;
  handleCheck: (event: any, index: any) => void;
  allChecked: boolean;
  isIndeterminate: boolean; // Estado para controle de estado intermediário dos checkboxes
  checkedItems: any[];
  editar(): Promise<number>;
  deletar(): Promise<number[]>;
  insert(): void;
  disclosureModalProfissionalCad: UseDisclosureReturn;
  handleSave: () => Promise<{ success: boolean }>;
}

// Criação do contexto para o Profissional
const ProfissionalContext = createContext<ProfissionalContextInterface>(
  {} as ProfissionalContextInterface
);

// Componente Provider para o contexto do Profissional
export const Provider = ({ children }) => {
  // Estados iniciais
  const [botoes, setBotoes] = useState({
    a: true,
    e: false,
    d: false,
  });

  const [item, setItem] = useState<Module.ProfissionaisInterface>(profissionalModelo);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const allChecked = checkedItems.length > 0 && checkedItems.every(Boolean);

  const disclosureModalProfissionalCad = useDisclosure();

  // Função para buscar os Profissionais usando SWR (React Hook)
  const fetchProfissionais = async (url) => {
    return await ProfissionaisClass.dbAll();
  };

  // Uso do SWR para buscar os Profissionais com atualização automática a cada 10 segundos
  const {
    data: listaProfissionais,
    isLoading: listaProfissionaisIsLoading,
    mutate,
  } = useSWR(API_PROFISSIONAIS, fetchProfissionais, {
    refreshInterval: 10000,
  });

  useEffect(() => {
    if (listaProfissionais) {
      // Inicializa o estado dos checkboxes com um array vazio
      setCheckedItems([]);
      setIsIndeterminate(false);
    }
  }, [listaProfissionais]);

  // Função para lidar com o evento de marcar todos os checkboxes
  const handleCheckAll = (event) => {
    const allChecked = event.target.checked;
    const newCheckedItems = listaProfissionais.json.map(() => allChecked);
    setCheckedItems(newCheckedItems);
    setIsIndeterminate(false);
    setBotoes({ a: !event.target.checked, d: event.target.checked, e: false });
  };

  // Função para contar os checkboxes marcados
  const countChecked = (checked) => {
    return checked.filter((item) => item).length;
  };

  // Função para lidar com o evento de marcar um único checkbox
  const handleCheck = (event, index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
    const count = countChecked(newCheckedItems);
    setIsIndeterminate(count > 0 && count < newCheckedItems.length);
    setBotoes({ a: count === 0, d: count >= 1, e: count === 1 });
    setItem(count === 1 ? listaProfissionais.json[index] : profissionalModelo);
  };

  // Função para editar um Profissional
  async function editar(): Promise<number> {
    const index: number = checkedItems.indexOf(true);
    const item: Module.ProfissionaisInterface = listaProfissionais.json[index];
    setItem(item);
    setCheckedItems(new Array(listaProfissionais.json.length).fill(false));
    setIsIndeterminate(false);
    setBotoes({ a: true, e: false, d: false });
    disclosureModalProfissionalCad.onOpen();
    return index;
  }

  // Função para deletar Profissionais
  async function deletar() {
    const indexesToDelete = checkedItems
      .map((isChecked, index) =>
        isChecked ? listaProfissionais.json[index]._id : null
      )
      .filter((id) => id !== null);

    await ProfissionaisClass.dbDelete({ id: indexesToDelete });
    await mutate();
    setCheckedItems(new Array(listaProfissionais.json.length).fill(false));
    setBotoes({
      a: true,
      e: false,
      d: false,
    });
    setIsIndeterminate(false);
    return indexesToDelete;
  }

  // Função para inserir um novo Profissional
  async function insert() {
    setItem(profissionalModelo);
    setCheckedItems(new Array(listaProfissionais.json.length).fill(false));
    setIsIndeterminate(false);
    
    disclosureModalProfissionalCad.onOpen();
  }

  // Função para salvar as alterações
  const handleSave = async () => {
    const Profissional = await ProfissionaisClass.createInstance(item);
    alert(JSON.stringify(Profissional))
    !item._id ? await Profissional.dbInsert(Profissional) : await Profissional.dbEdit(Profissional);

    setItem(profissionalModelo);
    setCheckedItems(new Array(listaProfissionais.json.length).fill(false));
    await mutate();
    disclosureModalProfissionalCad.onClose();

    return { success: true };
  };

  // Valor a ser fornecido ao contexto
  const value = {
    listaProfissionais,
    listaProfissionaisIsLoading,
    mutate,
    item,
    setItem,
    botoes,
    setBotoes,
    handleCheckAll,
    handleCheck,
    allChecked,
    editar,
    deletar,
    insert,
    disclosureModalProfissionalCad,
    handleSave,
    checkedItems,
    isIndeterminate,
  };

  return (
    <ProfissionalContext.Provider value={value}>
      {children}
    </ProfissionalContext.Provider>
  );
};

// Hook personalizado para usar o contexto do Profissional
export const useProfissionalContext = () => useContext(ProfissionalContext);
