import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import useSWR from "swr";
import { ServicosClass } from "../../classes/servicos";
import { API_SERVICOS, modelosBotoes } from "../../config/constants";
import { servicoModelo, Module } from "../../interfaces/Pdv.interface";

// Interface para o contexto do Servico
export interface ServicoContextInterface {
  listaServicos: any;
  listaServicosIsLoading: boolean;
  mutate();
  item: Module.ServicosInterface;
  setItem: Dispatch<SetStateAction<Module.ServicosInterface>>;
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
  disclosureModalServicoCad: UseDisclosureReturn;
  handleSave: () => Promise<{ success: boolean }>;
}

// Criação do contexto para o Servico
const ServicoContext = createContext<ServicoContextInterface>(
  {} as ServicoContextInterface
);

// Componente Provider para o contexto do Servico
export const ProviderServico = ({ children }) => {
  // Estados iniciais
  const [botoes, setBotoes] = useState({
    a: true,
    e: false,
    d: false,
  });

  const [item, setItem] = useState<Module.ServicosInterface>(servicoModelo);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const allChecked = checkedItems.length > 0 && checkedItems.every(Boolean);

  const disclosureModalServicoCad = useDisclosure();

  // Função para buscar os Servicos usando SWR (React Hook)
  const fetchServicos = async (url) => {
    return await ServicosClass.dbAll();
  };

  // Uso do SWR para buscar os Servicos com atualização automática a cada 10 segundos
  const {
    data: listaServicos,
    isLoading: listaServicosIsLoading,
    mutate,
  } = useSWR(API_SERVICOS, fetchServicos, {
    refreshInterval: 10000,
  });

  useEffect(() => {
    if (listaServicos) {
      // Inicializa o estado dos checkboxes com um array vazio
      setCheckedItems([]);
      setIsIndeterminate(false);
    }
  }, [listaServicos]);

  // Função para lidar com o evento de marcar todos os checkboxes
  const handleCheckAll = (event) => {
    const allChecked = event.target.checked;
    const newCheckedItems = listaServicos.json.map(() => allChecked);
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
    setItem(count === 1 ? listaServicos.json[index] : servicoModelo);
  };

  // Função para editar um Servico
  async function editar(): Promise<number> {
    const index: number = checkedItems.indexOf(true);
    const item: Module.ServicosInterface = listaServicos.json[index];
    setItem(item);
    setCheckedItems(new Array(listaServicos.json.length).fill(false));
    setIsIndeterminate(false);
    setBotoes({ a: true, e: false, d: false });
    disclosureModalServicoCad.onOpen();
    return index;
  }

  // Função para deletar Servicos
  async function deletar() {
    const indexesToDelete = checkedItems
      .map((isChecked, index) =>
        isChecked ? listaServicos.json[index]._id : null
      )
      .filter((id) => id !== null);

    await ServicosClass.dbDelete({ id: indexesToDelete });
    await mutate();
    setCheckedItems(new Array(listaServicos.json.length).fill(false));
    setBotoes({
      a: true,
      e: false,
      d: false,
    });
    setIsIndeterminate(false);
    return indexesToDelete;
  }

  // Função para inserir um novo Servico
  async function insert() {
    setItem(servicoModelo);
    setCheckedItems(new Array(listaServicos.json.length).fill(false));
    setIsIndeterminate(false);
    
    disclosureModalServicoCad.onOpen();
  }

  // Função para salvar as alterações
  const handleSave = async () => {
    const Servico = await ServicosClass.createInstance(item);
    !item._id ? await Servico.dbInsert(Servico) : await Servico.dbEdit(Servico);

    setItem(servicoModelo);
    setCheckedItems(new Array(listaServicos.json.length).fill(false));
    await mutate();
    disclosureModalServicoCad.onClose();

    return { success: true };
  };

  // Valor a ser fornecido ao contexto
  const value = {
    listaServicos,
    listaServicosIsLoading,
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
    disclosureModalServicoCad,
    handleSave,
    checkedItems,
    isIndeterminate,
  };

  return (
    <ServicoContext.Provider value={value}>
      {children}
    </ServicoContext.Provider>
  );
};

// Hook personalizado para usar o contexto do Servico
export const useServicoContext = () => useContext(ServicoContext);
