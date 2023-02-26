import { UseDisclosureProps } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { PdvModule } from "./Pdv.interface";
import { SectionInterface } from "./Section.interface";


export interface GlobalContextInterface {
  listaProdutos: any;
  listaProdutosIsLoading: boolean;
  disclosureMenu: UseDisclosureProps;
  disclosureModalProdCad: UseDisclosureProps;
  sections: SectionInterface[];
  mutate();
  item;
  setItem: Dispatch<SetStateAction<PdvModule.ProdutosClienteInterface>>
}
