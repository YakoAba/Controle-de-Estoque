import { ProdutosData } from "./Produtos.Ifood.Interface";
import { CategoriaDataApiIfood } from "./Categorias.interface";
import { SectionInterface } from "./Section.interface";

export interface GlobalContextInterface {
  isOpen: boolean;
  token: string;
  onOpen: () => void;
  onClose: () => void;
  setToken: (value: string) => void;
  listaProdutos: ProdutosData;
  listaProdutosIsLoading: boolean;
  listaCategorias: CategoriaDataApiIfood;
  listaCategoriasIsLoading: boolean;
  sections: SectionInterface[];
}
