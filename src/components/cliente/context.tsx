import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import useSWR from "swr";
import { ClienteClass } from "../../classes/ClienteClass";
import { API_CLIENTES, modelosBotoes } from "../../config/constants";
import { Módulos, clienteModelo } from "../../interfaces/interfaces";

export interface ClienteContextInterface {
  listaClientes: any;
  listaClientesIsLoading: boolean;
  // mutate();
  cliente: Módulos.ClienteInterface;
  setCliente: Dispatch<SetStateAction<Módulos.ClienteInterface>>;
  botoes: typeof modelosBotoes;
  setBotoes: Dispatch<SetStateAction<typeof modelosBotoes>>;
  // botoesIngredientes: typeof modelosBotoes;
  // setBotoesIngredientes: Dispatch<SetStateAction<typeof modelosBotoes>>;
  //
  handleCheckAll: (event: any) => void;
  handleCheck: (event: any, index: any) => void;
  // handleCheckAllIngredientes: (event: any) => void;
  // handleCheckIngredientes: (event: any, index: any) => void;
  // allChecked: boolean;
  // allCheckedIngredientes: boolean;
  // isIndeterminate: boolean;
  // checkedItems: any[];
  // checkedItemsIngredientes: any[];
  editar(): Promise<number>;
  deletar(): Promise<number[]>;
  insert(): void;
  disclosureModalClienteCadastro: UseDisclosureReturn;
  // isIndeterminateIngredientes: boolean;
  handleSave: () => Promise<{
    success: boolean;
  }>;
}

const ClienteContext = createContext<ClienteContextInterface>(
  {} as ClienteContextInterface
);

export const Provider = ({ children }) => {
  const [botoes, setBotoes] = useState({
    a: true,
    e: false,
    d: false,
  });

  const [cliente, setCliente] =
    useState<Módulos.ClienteInterface>(clienteModelo);
  const [checkedCliente, setCheckedCliente] = useState([]);

  const allChecked = checkedCliente.every(Boolean);
  const isIndeterminate = checkedCliente.some(Boolean) && !allChecked;

  // const allCheckedIngredientes = checkedItemsIngredientes.every(Boolean);
  // const isIndeterminateIngredientes =
  //   checkedItemsIngredientes.some(Boolean) && !allCheckedIngredientes;

  const disclosureModalClienteCadastro = useDisclosure();

  const fetchClientes = async (url) => {
    return await ClienteClass.dbAll();
  };

  const {
    data: listaClientes,
    isLoading: listaClientesIsLoading,
    mutate,
  } = useSWR(API_CLIENTES, fetchClientes, {
    refreshInterval: 60000, // atualiza a cada 10 segundos
  });

  // useEffect(() => {
  //   if (listaClientes) {
  //     // Inicializa o estado dos checkboxes com um array de false com o mesmo tamanho do número de ingredientes
  //     setCheckedCliente(new Array(listaClientes.length).fill(false));
  //   }
  // }, [listaClientes]);

  // useEffect(() => {
  //   if (cliente) {
  //     // Inicializa o estado dos checkboxes com um array de false com o mesmo tamanho do número de ingredientes
  //     // setCheckedItemsIngredientes(
  //     //   new Array(cliente.ingredientes.length).fill(false)
  //     // );
  //   }
  // }, [cliente]);

  const handleCheckAll = (event) => {
    // const allChecked = event.target.checked;
    // const newCheckedItems = listaClientes.json.map(() => allChecked);
    // setCheckedCliente(newCheckedItems);
    // setBotoes({ a: !event.target.checked, d: event.target.checked, e: false });
  };

  // const handleCheckAllIngredientes = (event) => {
  //   const newCheckedItems = checkedItemsIngredientes.map(
  //     () => event.target.checked
  //   );
  //   setCheckedItemsIngredientes(newCheckedItems);
  //   setBotoesIngredientes({
  //     a: !event.target.checked,
  //     d: event.target.checked,
  //     e: false,
  //   });
  // };

  const countChecked = (checked) => {
    return checked.filter((cliente) => cliente).length;
  };

  const handleCheck = (event, index) => {
    // const newCheckedItems = [...checkedCliente];
    // newCheckedItems[index] = event.target.checked;
    // setCheckedCliente(newCheckedItems);
    // const count = countChecked(newCheckedItems);
    // setBotoes({ a: count === 0, d: count >= 1, e: count === 1 });
    // setCliente(count === 1 ? listaClientes : clienteModelo);
  };

  // const handleCheckIngredientes = (event, index) => {
  //   const newCheckedItems = [...checkedItemsIngredientes];
  //   newCheckedItems[index] = event.target.checked;
  //   setCheckedItemsIngredientes(newCheckedItems);
  //   const count = countChecked(newCheckedItems);
  //   setBotoesIngredientes({ a: count === 0, d: count >= 1, e: count === 1 });
  // };

  async function editar(): Promise<number> {
    const index: number = checkedCliente.indexOf(true);
    const cliente: Módulos.ClienteInterface = listaClientes.json[index];

    setCliente(cliente);
    disclosureModalClienteCadastro.onOpen();
    return index;
  }

  async function deletar() {
    const indexesToDelete = checkedCliente
      .map((isChecked, index) =>
        isChecked ? listaClientes.json[index]._id : null
      )
      .filter((id) => id !== null);

    await ClienteClass.dbDelete({ id: indexesToDelete });
    await mutate();
    checkedCliente.map(() => false);
    setBotoes({
      a: true,
      e: false,
      d: false,
    });
    return indexesToDelete;
  }

  async function insert() {
    setCliente(clienteModelo);
    disclosureModalClienteCadastro.onOpen();
  }

  const handleSave = async () => {
    const vCliente = await ClienteClass.createInstance(cliente);
    !cliente.id
      ? await vCliente.dbInsert(vCliente)
      : await vCliente.dbEdit(vCliente);
    console.log(!cliente.id ? "insert" : "edit");
    console.log(cliente);
    setCliente(clienteModelo);
    setBotoes({ a: true, e: false, d: false });
    setCheckedCliente(checkedCliente.map(() => false));

    disclosureModalClienteCadastro.onClose();
    await mutate();
    return { success: true };
  };

  const value = {
    listaClientes,
    listaClientesIsLoading,
    cliente,
    setCliente,
    botoes,
    setBotoes,
    // botoesIngredientes,
    // setBotoesIngredientes,
    handleCheckAll,
    handleCheck,
    // allChecked,
    // isIndeterminate,
    // checkedItems,
    // checkedItemsIngredientes,
    editar,
    deletar,
    insert,
    disclosureModalClienteCadastro,
    handleSave,
    // handleCheckAllIngredientes,
    // handleCheckIngredientes,
    // allCheckedIngredientes,
    // isIndeterminateIngredientes,
  };

  return (
    <ClienteContext.Provider value={value}>{children}</ClienteContext.Provider>
  );
};

export const useClienteContext = () => useContext(ClienteContext);
