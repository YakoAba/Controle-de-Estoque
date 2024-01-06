import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import useSWR from "swr";
import { ClientesClass } from "../../classes/clientes";
import { API_CLIENTES, modelosBotoes } from "../../config/constants";
import { clienteModelo, Module } from "../../interfaces/Pdv.interface";

// Interface para o contexto do cliente
export interface ClienteContextInterface {
  listaClientes: any;
  listaClientesIsLoading: boolean;
  mutate();
  item: Module.ClientesInterface;
  setItem: Dispatch<SetStateAction<Module.ClientesInterface>>;
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
  disclosureModalClienteCad: UseDisclosureReturn;
  handleSave: () => Promise<{ success: boolean }>;
}

// Criação do contexto para o cliente
const ClienteContext = createContext<ClienteContextInterface>(
  {} as ClienteContextInterface
);

// Componente Provider para o contexto do cliente
export const Provider = ({ children }) => {
  // Estados iniciais
  const [botoes, setBotoes] = useState({
    a: true,
    e: false,
    d: false,
  });

  const [item, setItem] = useState<Module.ClientesInterface>(clienteModelo);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const allChecked = checkedItems.length > 0 && checkedItems.every(Boolean);

  const disclosureModalClienteCad = useDisclosure();

  // Função para buscar os clientes usando SWR (React Hook)
  const fetchClientes = async (url) => {
    return await ClientesClass.dbAll();
  };

  // Uso do SWR para buscar os clientes com atualização automática a cada 10 segundos
  const {
    data: listaClientes,
    isLoading: listaClientesIsLoading,
    mutate,
  } = useSWR(API_CLIENTES, fetchClientes, {
    refreshInterval: 10000,
  });

  useEffect(() => {
    if (listaClientes) {
      // Inicializa o estado dos checkboxes com um array vazio
      setCheckedItems([]);
      setIsIndeterminate(false);
    }
  }, [listaClientes]);

  // Função para lidar com o evento de marcar todos os checkboxes
  const handleCheckAll = (event) => {
    const allChecked = event.target.checked;
    const newCheckedItems = listaClientes.json.map(() => allChecked);
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
    setItem(count === 1 ? listaClientes.json[index] : clienteModelo);
  };

  // Função para editar um cliente
  async function editar(): Promise<number> {
    const index: number = checkedItems.indexOf(true);
    const item: Module.ClientesInterface = listaClientes.json[index];
    setItem(item);
    setCheckedItems(new Array(listaClientes.json.length).fill(false));
    setIsIndeterminate(false);
    disclosureModalClienteCad.onOpen();
    return index;
  }

  // Função para deletar clientes
  async function deletar() {
    const indexesToDelete = checkedItems
      .map((isChecked, index) =>
        isChecked ? listaClientes.json[index]._id : null
      )
      .filter((id) => id !== null);

    await ClientesClass.dbDelete({ id: indexesToDelete });
    await mutate();
    setCheckedItems(new Array(listaClientes.json.length).fill(false));
    setBotoes({
      a: true,
      e: false,
      d: false,
    });
    setIsIndeterminate(false);
    return indexesToDelete;
  }

  // Função para inserir um novo cliente
  async function insert() {
    setItem(clienteModelo);
    setCheckedItems([]);
    setIsIndeterminate(false);
    disclosureModalClienteCad.onOpen();
  }

  // Função para salvar as alterações
  const handleSave = async () => {
    const cliente = await ClientesClass.createInstance(item);
    !item._id ? await cliente.dbInsert(cliente) : await cliente.dbEdit(cliente);

    setItem(clienteModelo);
    setBotoes({ a: true, e: false, d: false });
    // setCheckedItems(new Array(listaClientes.json.length).fill(false));
    await mutate();
    disclosureModalClienteCad.onClose();

    return { success: true };
  };

  // Valor a ser fornecido ao contexto
  const value = {
    listaClientes,
    listaClientesIsLoading,
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
    disclosureModalClienteCad,
    handleSave,
    checkedItems,
    isIndeterminate,
  };

  return (
    <ClienteContext.Provider value={value}>
      {children}
    </ClienteContext.Provider>
  );
};

// Hook personalizado para usar o contexto do cliente
export const useClienteContext = () => useContext(ClienteContext);
