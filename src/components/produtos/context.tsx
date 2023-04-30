import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import { ProdutosClass } from "../../classes/produtos";
import { API_PRODUTOS, modelosBotoes } from "../../config/constants";
import { PdvModule, produtoModelo } from "../../interfaces/Pdv.interface";

export interface ProdutoContextInterface {
  listaProdutos: any;
  listaProdutosIsLoading: boolean;
  mutate();
  item: PdvModule.ProdutosInterface;
  setItem: Dispatch<SetStateAction<PdvModule.ProdutosInterface>>;
  botoes: typeof modelosBotoes;
  botoesIngredientes: typeof modelosBotoes;
  setBotoesIngredientes: Dispatch<SetStateAction<typeof modelosBotoes>>;
  setBotoes: Dispatch<SetStateAction<typeof modelosBotoes>>;
  handleCheckAll: (event: any) => void;
  handleCheck: (event: any, index: any) => void;
  handleCheckAllIngredientes: (event: any) => void;
  handleCheckIngredientes: (event: any, index: any) => void;
  allChecked: boolean;
  allCheckedIngredientes: boolean;
  isIndeterminate: boolean;
  checkedItems: any[];
  checkedItemsIngredientes: any[];
  editar(): Promise<number>;
  deletar(): Promise<number[]>;
  insert(): void;
  disclosureModalProdCad: UseDisclosureReturn;
  isIndeterminateIngredientes: boolean;
  handleSave: () => Promise<{
    success: boolean;
  }>;
}

const ProdutoContext = createContext<ProdutoContextInterface>(
  {} as ProdutoContextInterface
);

export const Provider = ({ children }) => {
  const [botoes, setBotoes] = useState({
    a: true,
    e: false,
    d: false,
  });

  const [botoesIngredientes, setBotoesIngredientes] = useState({
    a: true,
    e: false,
    d: false,
  });

  const [item, setItem] = useState<PdvModule.ProdutosInterface>(produtoModelo);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedItemsIngredientes, setCheckedItemsIngredientes] = useState([]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const allCheckedIngredientes = checkedItemsIngredientes.every(Boolean);
  const isIndeterminateIngredientes =
    checkedItemsIngredientes.some(Boolean) && !allCheckedIngredientes;

  const disclosureModalProdCad = useDisclosure();

  const fetchProdutos = async (url) => {
    return await ProdutosClass.dbAll();
  };

  const {
    data: listaProdutos,
    isLoading: listaProdutosIsLoading,
    mutate,
  } = useSWR(API_PRODUTOS, fetchProdutos, {
    refreshInterval: 6000, // atualiza a cada 10 segundos
  });

  useEffect(() => {
    if (listaProdutos) {
      // Inicializa o estado dos checkboxes com um array de false com o mesmo tamanho do número de ingredientes
      setCheckedItems(new Array(listaProdutos.length).fill(false));
    }
  }, [listaProdutos]);

  // useEffect(() => {
  //   if (item) {
  //     // Inicializa o estado dos checkboxes com um array de false com o mesmo tamanho do número de ingredientes
  //     setCheckedItemsIngredientes(
  //       new Array(item.ingredientes.length).fill(false)
  //     );
  //   }
  // }, [item]);

  const handleCheckAll = (event) => {
    const allChecked = event.target.checked;
    const newCheckedItems = listaProdutos.json.map(() => allChecked);
    setCheckedItems(newCheckedItems);
    setBotoes({ a: !event.target.checked, d: event.target.checked, e: false });
  };

  const handleCheckAllIngredientes = (event) => {
    const newCheckedItems = checkedItemsIngredientes.map(
      () => event.target.checked
    );
    setCheckedItemsIngredientes(newCheckedItems);
    setBotoesIngredientes({
      a: !event.target.checked,
      d: event.target.checked,
      e: false,
    });
  };

  const countChecked = (checked) => {
    return checked.filter((item) => item).length;
  };

  const handleCheck = (event, index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
    const count = countChecked(newCheckedItems);
    setBotoes({ a: count === 0, d: count >= 1, e: count === 1 });
    setItem(count === 1 ? listaProdutos.json[index] : produtoModelo);
  };

  const handleCheckIngredientes = (event, index) => {
    const newCheckedItems = [...checkedItemsIngredientes];
    newCheckedItems[index] = event.target.checked;
    setCheckedItemsIngredientes(newCheckedItems);
    const count = countChecked(newCheckedItems);
    setBotoesIngredientes({ a: count === 0, d: count >= 1, e: count === 1 });
  };

  async function editar(): Promise<number> {
    const index: number = checkedItems.indexOf(true);
    const item: PdvModule.ProdutosInterface = listaProdutos.json[index];

    setItem(item);
    setCheckedItemsIngredientes(checkedItemsIngredientes.map(() => false));
    setBotoesIngredientes({ a: true, e: false, d: false });

    disclosureModalProdCad.onOpen();
    return index;
  }

  async function deletar() {
    const indexesToDelete = checkedItems
      .map((isChecked, index) =>
        isChecked ? listaProdutos.json[index]._id : null
      )
      .filter((id) => id !== null);

    await ProdutosClass.dbDelete({ id: indexesToDelete });
    await mutate();
    checkedItems.map(() => false);
    setBotoes({
      a: true,
      e: false,
      d: false,
    });
    return indexesToDelete;
  }

  async function insert() {
    setItem(produtoModelo);
    setBotoesIngredientes({ a: true, e: false, d: false });
    disclosureModalProdCad.onOpen();
  }

  const handleSave = async () => {
    const produto = await ProdutosClass.createInstance(item);
    !item._id ? await produto.dbInsert(produto) : await produto.dbEdit(produto);

    setItem(produtoModelo);
    setBotoes({ a: true, e: false, d: false });
    setCheckedItems(checkedItems.map(() => false));

    disclosureModalProdCad.onClose();
    await mutate();
    return { success: true };
  };

  const value = {
    listaProdutos,
    listaProdutosIsLoading,
    mutate,
    item,
    setItem,
    botoes,
    setBotoes,
    botoesIngredientes,
    setBotoesIngredientes,
    handleCheckAll,
    handleCheck,
    allChecked,
    isIndeterminate,
    checkedItems,
    checkedItemsIngredientes,
    editar,
    deletar,
    insert,
    disclosureModalProdCad,
    handleSave,
    handleCheckAllIngredientes,
    handleCheckIngredientes,
    allCheckedIngredientes,
    isIndeterminateIngredientes,
  };

  return (
    <ProdutoContext.Provider value={value}>{children}</ProdutoContext.Provider>
  );
};

export const useProdutoContext = () => useContext(ProdutoContext);
